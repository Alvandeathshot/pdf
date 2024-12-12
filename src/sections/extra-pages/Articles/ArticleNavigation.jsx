
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ArticleNavigation({ maxArticles }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const articleId = parseInt(id, 10);

    const handlePrevious = () => {
        if (articleId > 1) {
            navigate(`/articles/${articleId - 1}`);
        }
    };

    const handleNext = () => {
        if (articleId < maxArticles) {
            navigate(`/articles/${articleId + 1}`);
        }
    };

    if (isNaN(articleId) || articleId < 1 || articleId > maxArticles) {
        return (
            <Typography variant="h6" color="error" align="center">
                Article not found
            </Typography>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button 
                variant="contained" 
                onClick={handlePrevious} 
                disabled={articleId <= 1}
                aria-label="Previous Article"
                startIcon={<ArrowBackIcon />}
                sx={{
                    backgroundColor: articleId <= 1 ? '#ccc' : 'primary.main',
                    cursor: articleId <= 1 ? 'not-allowed' : 'pointer',
                }}
            >
                Previous
            </Button>
            <Button 
                variant="contained" 
                onClick={handleNext} 
                disabled={articleId >= maxArticles}
                aria-label="Next Article"
                endIcon={<ArrowForwardIcon />}
                sx={{
                    backgroundColor: articleId >= maxArticles ? '#ccc' : 'primary.main',
                    cursor: articleId >= maxArticles ? 'not-allowed' : 'pointer',
                }}
            >
                Next
            </Button>
        </Box>
    );
}

export default ArticleNavigation;
