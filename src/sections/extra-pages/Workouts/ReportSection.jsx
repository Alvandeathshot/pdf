import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import Button
import Box from '@mui/material/Box'; // Import Box for layout
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function WorkoutReportSection({ WorkoutData, onSubscribeClick }) {
  const { cardio = 0, stretching = 0, resistance = 0 } = WorkoutData;
  const [showReport, setShowReport] = useState(false); // State to show/hide feedback
  const [showNextButton, setShowNextButton] = useState(false); // State to show/hide "Next" button
  const navigate = useNavigate(); // Hook for navigation

  // Handler for the "Submit" button
  const handleSubmit = () => {
    setShowReport(true); // Show feedback content
    setShowNextButton(true); // Show the "Next" button
  };

  // Function to generate the feedback content
  const generateFeedbackContent = () => {
    let feedback = '';

    if (cardio >= 100) {
      feedback += 'Good, you are getting adequate cardio exercise.\n';
    } else {
      feedback += 'You need to improve your cardio exercise.\n';
    }

    if (stretching >= 100) {
      feedback += 'Good, you are getting adequate stretching exercise.\n';
    } else {
      feedback += 'You need to improve your stretching exercise.\n';
    }

    if (resistance >= 100) {
      feedback += 'Good, you are getting adequate resistance training.\n';
    } else {
      feedback += 'You need to improve your resistance training.\n';
    }

    return feedback;
  };

  // Function to navigate to the Recovery page
  const handleNext = () => {
    navigate('/recovery'); // Redirect to the Recovery page
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Workout Test Report
      </Typography>

      {/* Initial Report */}
      <Typography variant="body1" gutterBottom>
        You spent:
      </Typography>
      <Typography variant="body1" gutterBottom>
        - {cardio} minutes on cardio
      </Typography>
      <Typography variant="body1" gutterBottom>
        - {stretching} minutes on stretching
      </Typography>
      <Typography variant="body1" gutterBottom>
        - {resistance} minutes on resistance training
      </Typography>

      {/* Submit Button */}
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      {/* Display feedback after the Submit button is clicked */}
      {showReport && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Feedback:</Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            {generateFeedbackContent()}
          </Typography>
        </Box>
      )}

      {/* Next Button */}
      {showNextButton && (
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
      )}

      <br />
      <Typography>
        <Link
          style={{
            textDecoration: 'underline',
            fontWeight: 'bold',
            color: '#FF4500',
          }}
          onClick={onSubscribeClick} // Call the function to scroll
        >
          Subscribe
        </Link>{' '}
        for tracking your learning and for insights.
      </Typography>
      <br />
    </Paper>
  );
}
