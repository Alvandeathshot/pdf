import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Typography, CardMedia, Container } from '@mui/material';
import MainCard from 'components/MainCard';
import { Bar,Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import AWSCognitoContext from 'contexts/AWSCognitoContext';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Setup DynamoDB client
const dynamoDbClient = new DynamoDBClient({
  region: 'us-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

export default function Dash() {
  const { user } = useContext(AWSCognitoContext);
  const [foundationData, setFoundationData] = useState(0); // Only need foundation data for this graph

  // Fetch data from DynamoDB on component mount
  useEffect(() => {
    if (!user?.email) return;
    const fetchData = async () => {
      const params = {
        TableName: 'Register_Data',
        Key: { email: { S: user.email } }
      };
      try {
        const command = new GetItemCommand(params);
        const data = await dynamoDbClient.send(command);
        if (data.Item) {
          setFoundationData(parseInt(data.Item.article_foundation_count?.N || '0', 10));
        }
      } catch (error) {
        console.error('Error fetching foundation data:', error);
      }
    };
    fetchData();
  }, [user]);

  // Data for the charts
  const foundationChartData = {
    labels: Array.from({length: 31}, (_, i) => i + 1), // Labels now represent dates 1 to 31
    datasets: [{
      label: 'Foundation Articles',
      data: Array.from({length: 31}, (_, i) => foundationData / (i + 1)), // Adjust data generation logic
      backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }]
};

  const dyadicHealthChartData = {
    labels: Array.from({length: 31}, (_, i) => i), // Labels now represent dates 1 to 31
    datasets: [{
      label: 'Dyadic Health',
      data: [1,7,5,6],
      backgroundColor: 'rgba(153, 102, 255, 0.5)'
    }]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Typography variant="h5" fontWeight="bold">Foundation Performance</Typography>
            <Line data={foundationChartData} options={{ responsive: true }} />
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Typography variant="h5" fontWeight="bold">Dyadic Health</Typography>
            <Line data={dyadicHealthChartData} options={{ responsive: true }} />
          </MainCard>
        </Grid>
      </Grid>
    </Container>
  );
}
