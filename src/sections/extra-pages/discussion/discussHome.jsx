import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

export default function HomePage() {
    return (
        <Box 
        
        sx={{
            display: 'flex',          // Use flexbox
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', 
            height: '40vh',
        }}
        
        >
        <Container>
            <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Welcome to Dyadic Health
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Join your community discussion
                </Typography>
                <div style={{ marginTop: '20px' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => alert('Discussion joined!')} // Add an action when clicked
                    >
                        Join Discussion
                    </Button>
                </div>
            </Box>
        </Container>
    </Box>
    );
}
