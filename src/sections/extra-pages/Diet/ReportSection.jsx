import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DietReportSection({ dietData, recommendation, onRecommendationChange, onSubscribeClick }) {
  const navigate = useNavigate();
  const [showNextButton, setShowNextButton] = useState(false);

  // Calculate if any dietary data has been entered
  const hasConsumptionData = Object.values(dietData).some(value => value > 0);

  const fetchReport = () => {
    axios.post('https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/diet', dietData)
      .then((response) => {
        onRecommendationChange(response.data);
        setShowNextButton(true);
      })
      .catch((error) => {
        console.error('Error fetching report:', error);
        alert('Failed to fetch the report. Please try again later.');
      });
  };

  const handleNext = () => {
    navigate('/workout');
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Diet Test Report
      </Typography>
      <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
        You consumed:
      </Typography>
      {hasConsumptionData ? (
        <>
          <Typography variant="body1">- {dietData.veggies} servings of vegetables</Typography>
          <Typography variant="body1">- {dietData.protein} servings of protein</Typography>
          <Typography variant="body1">- {dietData.grains} servings of grains</Typography>
          <Typography variant="body1">- {dietData.nutsSeeds} servings of nuts & seeds</Typography>
          <Typography variant="body1">- {dietData.dairy} servings of dairy</Typography>
          <Typography variant="body1">- {dietData.fruits} servings of fruits</Typography>
        </>
      ) : (
        <Typography variant="body1">No consumption data available.</Typography>
      )}
       <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={fetchReport}>
          Submit
        </Button>
      </Box>
      {recommendation && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>Recommendation:</Typography>
          {Object.keys(recommendation).map((foodGroup, idx) => (
            <Typography key={idx} variant="body1">
              {foodGroup.charAt(0).toUpperCase() + foodGroup.slice(1)}: {recommendation[foodGroup]}
            </Typography>
          ))}
        </>
      )}

      

      {showNextButton && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
      )}

      <br />
      <Typography>
        <Link style={{ textDecoration: 'underline', fontWeight: 'bold', color: '#FF4500' }} onClick={onSubscribeClick}>
          Subscribe
        </Link> for tracking your learning and for insights.
      </Typography>
      <br />
    </Paper>
  );
}
