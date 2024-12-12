import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Typography, CardMedia, Container } from '@mui/material';
import MainCard from 'components/MainCard';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import AWSCognitoContext from 'contexts/AWSCognitoContext';
import DyadContainers from './DyadContainers';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
// Import the icons from assets
import breath from 'assets/images/landing/breath.svg';
import posture from 'assets/images/landing/posture.svg';
import workout from 'assets/images/landing/workout.svg';
import foundation from 'assets/images/landing/foundation.svg';
import diet from 'assets/images/landing/diet.svg';
import recovery from 'assets/images/landing/recovery.svg';

const dynamoDbClient = new DynamoDBClient({
  region: 'us-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const technologies = [
  { icon: foundation, title: 'Foundation', columnName: 'article_foundation_count' },
  { icon: breath, title: 'Breathing', columnName: 'article_breathing_count' },
  { icon: posture, title: 'Posture', columnName: 'article_posture_count' },
  { icon: workout, title: 'Workout', columnName: 'article_workout_count' },
  { icon: diet, title: 'Diet', columnName: 'article_diet_count' },
  { icon: recovery, title: 'Recovery', columnName: 'article_recovery_count' }
];


export default function TechnologiesSection() {
  const { user } = useContext(AWSCognitoContext);
  const [articleCounts, setArticleCounts] = useState({
    foundation: 0,
    breathing: 0,
    posture: 0,
    workout: 0,
    diet: 0,
    recovery: 0
  });

  useEffect(() => {
    if (!user?.email) return;
    const fetchArticleCounts = async () => {
      const params = {
        TableName: 'Register_Data',
        Key: { email: { S: user.email } }
      };
      try {
        const command = new GetItemCommand(params);
        const data = await dynamoDbClient.send(command);
        if (data.Item) {
          setArticleCounts({
            foundation: parseInt(data.Item.article_foundation_count?.N || '0', 10),
            breathing: parseInt(data.Item.article_breathing_count?.N || '0', 10),
            posture: parseInt(data.Item.article_posture_count?.N || '0', 10),
            workout: parseInt(data.Item.article_workout_count?.N || '0', 10),
            diet: parseInt(data.Item.article_diet_count?.N || '0', 10),
            recovery: parseInt(data.Item.article_recovery_count?.N || '0', 10),
          });
        }
      } catch (error) {
        console.error('Error fetching article counts:', error);
      }
    };
    fetchArticleCounts();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {technologies.map((tech, index) => (
              // Adjusting for two cards per row at medium screen sizes
              <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                <MainCard>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia component="img" image={tech.icon} alt={tech.title} sx={{ width: 60, height: 60, mr: 2 }} />
                    <Typography variant="h5" fontWeight="bold">{tech.title}</Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Bar
                      data={{
                        labels: ['Jan', 'Feb', 'Mar'],
                        datasets: [{
                          label: 'Articles',
                          data: [articleCounts.foundation, 0, 0],
                          backgroundColor: 'rgba(75, 192, 192, 0.5)'
                        }]
                      }}
                      options={{ responsive: true }}
                    />
                  </Box>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <DyadContainers />
        </Grid>
      </Grid>
    </Container>
  );
}
