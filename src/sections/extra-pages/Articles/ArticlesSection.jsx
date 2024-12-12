import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet'; // Import Helmet for managing head tags
import AWSCognitoContext from 'contexts/AWSCognitoContext'; // Import Cognito context
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'; // DynamoDB

const ScrollableContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-behavior: smooth;
  position: relative;
  max-width: 100%;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// Initialize DynamoDB client using import.meta.env
const dynamoDbClient = new DynamoDBClient({
  region: 'us-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

export default function ArticlesSection() {
  const [articlesByTags, setArticlesByTags] = useState({
    foundation: [],
    dyadic_health: [],
    family: [],
    parent: [],
    spousal: [],
    parental: [],
    other: []
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null); // Error state for UI feedback
  const containerRefs = useRef({});
  const navigate = useNavigate();
  const observer = useRef();

  const { isLoggedIn, user } = useContext(AWSCognitoContext);

  const fetchArticles = async (pageNumber) => {
    try {
      setIsLoading(true);
      setError(null); // Reset error state before fetching
      const articlesData = [];
      const startIndex = (pageNumber - 1) * 5 + 1; 
      const endIndex = startIndex + 4;

      for (let i = startIndex; i <= endIndex; i++) {
        const response = await fetch(`https://dyadicarticles.s3.us-west-2.amazonaws.com/ArticleContent/article${i}.json`);
        if (response.ok) {
          const articleData = await response.json();
          articlesData.push(articleData);
        } else {
          setHasMore(false); 
          break;
        }
      }

      const grouped = {
        foundation: [],
        dyadic_health: [],
        family: [],
        parent: [],
        spousal: [],
        parental: [],
        other: []
      };

      articlesData.forEach((article) => {
        let tag = article.tag.toLowerCase().replace(/\s+/g, '_');
        if (tag === 'dyadichealth') {
          tag = 'dyadic_health';
        }
        if (grouped[tag]) {
          grouped[tag].push(article);
        } else {
          grouped.other.push(article);
        }
      });

      setArticlesByTags((prev) => ({
        foundation: [...prev.foundation, ...grouped.foundation],
        dyadic_health: [...prev.dyadic_health, ...grouped.dyadic_health],
        family: [...prev.family, ...grouped.family],
        parent: [...prev.parent, ...grouped.parent],
        spousal: [...prev.spousal, ...grouped.spousal],
        parental: [...prev.parental, ...grouped.parental],
        other: [...prev.other, ...grouped.other]
      }));

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      setError('Failed to load articles. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchArticles(page);
    }
  }, [page]);

  const lastArticleRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect(); 
      }
    };
  }, []);

  const logArticleRead = async (articleTag) => {
    if (!user?.email) return;

    const attributeMap = {
        foundation: 'article_foundation_count',
        breathing: 'article_breathing_count',
        posture: 'article_posture_count',
        workout: 'article_workout_count',
        diet: 'article_diet_count',
        recovery: 'article_recovery_count'
    };

    const attributeName = attributeMap[articleTag];
    if (!attributeName) return;

    const params = {
        TableName: 'Register_Data',
        Key: { email: { S: user.email } },
        UpdateExpression: `ADD ${attributeName} :inc, readArticles :articleId`, // Combine update operations
        ExpressionAttributeValues: {
            ':articleId': { SS: [articleTag] }, // Ensure articleTag is unique and used in the readArticles array
            ':inc': { N: '1' }
        },
        ConditionExpression: 'attribute_exists(email) AND NOT contains(readArticles, :articleId)' // Combine conditions
    };

    try {
        const command = new UpdateItemCommand(params);
        await dynamoDbClient.send(command);
        console.log('Article read logged successfully');
    } catch (error) {
        console.error('Error logging article read:', error);
    }
};

  const handleCardClick = (id, tag) => {
    const routePrefix = isLoggedIn ? '/hello/articles/' : '/articles/';
    navigate(`${routePrefix}${id}`);

    if (isLoggedIn && user?.email) {
      logArticleRead(tag);
    }
  };

  const handleScroll = (tag, direction) => {
    if (containerRefs.current[tag]) {
      const scrollAmount = 300;
      containerRefs.current[tag].scrollBy({
        top: 0,
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Articles | Dyadic Health</title>
        <meta name="description" content="Explore various articles on Dyadic Health, covering topics such as family dynamics, relationships, and wellness." />
        <meta name="keywords" content="Dyadic Health, Articles, Family, Relationships, Wellness" />
        <link rel="canonical" href="https://dyadichealth.com/Articles" />
        <meta property="og:title" content="Articles | Dyadic Health" />
        <meta property="og:description" content="Explore various articles on Dyadic Health, covering topics such as family dynamics, relationships, and wellness." />
        <meta property="og:url" content="https://dyadichealth.com/Articles" />
        <meta property="og:type" content="website" />
        {/* Viewport meta tag for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Helmet>
      
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {Object.keys(articlesByTags).map((tag) => (
          articlesByTags[tag].length > 0 && (
            <div key={tag} style={{ position: 'relative', marginBottom: '40px' }}>
              <Typography variant="h4" align="left" sx={{ my: 2 }}>
                {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/_/g, ' ')}
              </Typography>
              <ScrollButton direction="left" onClick={() => handleScroll(tag, 'left')}>
                ←
              </ScrollButton>
              <ScrollableContainer ref={(el) => (containerRefs.current[tag] = el)}>
                {articlesByTags[tag].map((article, index) => (
                  <Card
                    key={article.id}
                    ref={index === articlesByTags[tag].length - 1 ? lastArticleRef : null}
                    sx={{
                      width: '216px',
                      height: '348px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <CardActionArea onClick={() => handleCardClick(article.id, tag)}>
                      <CardMedia
                        component="img"
                        height="348"
                        image={article.imgSrc}
                        alt={`Image for ${article.title}`}
                        sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </ScrollableContainer>
              <ScrollButton direction="right" onClick={() => handleScroll(tag, 'right')}>
                →
              </ScrollButton>
            </div>
          )
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error" align="center">{error}</Typography>}
      </Container>
    </>
  );
}
