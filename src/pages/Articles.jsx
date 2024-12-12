import React, { useState, useEffect, useRef, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AWSCognitoContext from 'contexts/AWSCognitoContext';
import { Helmet } from 'react-helmet'; // Import Helmet for SEO
import { useNavigate } from 'react-router-dom'; // For navigation

const ArticleContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: hidden;
  padding: 20px 0;
  position: relative;
  white-space: nowrap;
`;

const ArticleCard = styled.div`
  flex: 0 0 150px;
  max-width: 200px;
  height: 100%;
  background: #80b3ff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin: 0;
  &:hover {
    transform: scale(1.05);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 0;
  padding: 0;
  flex-grow: 1;
`;

const ContentBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

export default function ArticlesPage() {
  const { isLoggedIn, user } = useContext(AWSCognitoContext);
  const [articles, setArticles] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const articleList = [];
        for (let i = 1; i <= 5; i++) {
          const response = await fetch(`https://dyadicarticles.s3.us-west-2.amazonaws.com/ArticleContent/article${i}.json`);
          if (response.ok) {
            const articleData = await response.json();
            articleList.push(articleData);
          } else {
            console.error(`Failed to fetch article${i}.json:`, response.status);
          }
        }
        setArticles([...articleList, ...articleList]); // Duplicate for seamless scrolling
        setSelectedContent(articleList[0]);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
        const scrollAmount = 1;

        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '70vh', padding: 3 }}>
      {/* SEO Section using React Helmet */}
      {selectedContent && (
        <Helmet>
          <meta name="description" content={selectedContent.abstract} />
          <meta name="keywords" content={`learning, resources, ${selectedContent.title}`} />
          <meta property="og:title" content={selectedContent.title} />
          <meta property="og:description" content={selectedContent.abstract} />
          <meta property="og:image" content={selectedContent.imgSrc} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://dyadichealth.com/articles/${selectedContent.id}`} />
          <link rel="canonical" href={`https://dyadichealth.com/articles/${selectedContent.id}`} />
          <meta charSet="UTF-8" />
          {/* Viewport meta tag for mobile responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Structured Data for Articles */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: selectedContent.title,
              description: selectedContent.abstract,
              image: selectedContent.imgSrc,
              author: {
                "@type": "Person",
                name: user ? user.username : "Unknown Author"
              },
              datePublished: selectedContent.publishedDate, // Ensure this field is present in your article JSON
              url: `https://dyadichealth.com/articles/${selectedContent.id}`,
            })}
          </script>
        </Helmet>
      )}

      <Container>
        <Box sx={{ marginBottom: 5, marginTop: 2, fontWeight: 'bold', color: '#37474f' }}>
          <Typography variant="h2" align="center" gutterBottom>
            Learning Resources
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          {/* Left Side: Article Scrollable Container */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '10cm' }}>
            <MainCard
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#80b3ff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <ArticleContainer ref={containerRef} style={{ flexGrow: 1, width: '100%', padding: '10px' }}>
                  {articles.map((article, index) => (
                    <ArticleCard
                      key={index}
                      onClick={() => {
                        setSelectedContent(article);
                      }}
                    >
                      <ArticleImage
                        src={article.imgSrc || '/path/to/default-image.jpg'}
                        alt={article.title || 'Article Image'}
                      />
                    </ArticleCard>
                  ))}
                </ArticleContainer>
              )}
            </MainCard>
          </Grid>

          {/* Right Side: Content Display Container */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10cm' }}>
            <MainCard
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#80b3ff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px',
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                selectedContent && (
                  <ContentBox>
                    <Typography variant="h5" gutterBottom>
                      {selectedContent.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedContent.abstract}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/articles/${selectedContent.id}`)} // Navigate to full article
                    >
                      Read Full Article
                    </Button>
                  </ContentBox>
                )
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
