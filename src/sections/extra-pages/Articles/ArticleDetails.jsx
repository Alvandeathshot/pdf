import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArticledetailHead from 'sections/extra-pages/Articles/Articledetailhead';
import ArticleNavigation from './ArticleNavigation';
import Free from 'sections/landing/Free';
import AWSCognitoContext from 'contexts/AWSCognitoContext'; 
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'; 

// Utility function to parse text for bold markup
function parseContentWithBold(text) {
    const parts = text.split(/(\*\*.*?\*\*)/g); 
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <Typography key={index} component="span" sx={{ fontWeight: 'bold' }}>
                    {part.slice(2, -2)} 
                </Typography>
            );
        } else {
            return (
                <Typography key={index} component="span">
                    {part}
                </Typography>
            );
        }
    });
}

export default function ArticleDetail() {
    const { isLoggedIn, user } = useContext(AWSCognitoContext); 
    const { id } = useParams(); 
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [maxArticles, setMaxArticles] = useState(5); 

    const dynamoDbClient = new DynamoDBClient({
        region: 'us-west-2',
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        },
    });

    const updateArticleReadsInDynamoDB = async (articleTag) => {
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
            UpdateExpression: `ADD ${attributeName} :inc, readArticles :articleId`, // Combine the update operation
            ExpressionAttributeValues: {
                ':articleId': { SS: [articleTag] }, // Ensure articleId is added once to readArticles array
                ':inc': { N: '1' }
            },
            ConditionExpression: 'attribute_exists(email) AND NOT contains(readArticles, :articleId)' // Combine conditions
        };
    
        try {
            const command = new UpdateItemCommand(params);
            await dynamoDbClient.send(command);
            console.log('Article read count updated in DynamoDB!');
        } catch (error) {
            console.error('Error updating DynamoDB:', error);
        }
    };

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://dyadicarticles.s3.us-west-2.amazonaws.com/ArticleContent/article${id}.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch article');
                }
                const articleData = await response.json();
                setArticle(articleData);

                if (isLoggedIn) {
                    console.log(`User ${user?.email} viewed article ${id}`);
                    updateArticleReadsInDynamoDB(articleData.tag);
                }
            } catch (error) {
                console.error('Failed to fetch article:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, isLoggedIn, user]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!article) {
        return <Typography variant="h6">Failed to load the article.</Typography>;
    }

    const paragraphs = article.content.split('\n\n');

    return (
        <>
            <ArticledetailHead />

            <Container sx={{ my: 4 }}>
                <Box
                    sx={{
                        marginTop: 10,
                        marginBottom: 3,
                        paddingTop: 5,
                        border: '10px solid #ddd',
                        borderRadius: 2,
                        padding: 2,
                        position: 'relative',
                    }}
                >
                    {article.additionalImages ? (
                        <Box
                            component="img"
                            src={article.additionalImages}
                            alt={article.title}
                            sx={{
                                float: 'right',
                                marginLeft: 4,
                                marginBottom: 2,
                                width: { xs: '100%', sm: '40%', md: '30%' },
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    ) : (
                        <Typography
                            sx={{
                                float: 'right',
                                marginLeft: 3,
                                marginBottom: 2,
                                backgroundColor: 'white',
                                padding: '5px 10px',
                                borderRadius: 1,
                                border: '1px solid #ddd',
                                textAlign: 'center',
                            }}
                        >
                            Image not found
                        </Typography>
                    )}

                    <Typography variant="h4" gutterBottom>
                        {article.title}
                    </Typography>

                    {paragraphs.map((paragraph, index) => (
                        <Typography key={index} variant="body1" paragraph>
                            {parseContentWithBold(paragraph)}
                        </Typography>
                    ))}

                    <ArticleNavigation maxArticles={maxArticles} />
                </Box>
            </Container>

            <Container>
                <Free />
            </Container>
        </>
    );
}