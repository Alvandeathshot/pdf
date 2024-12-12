import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function DietReportSection({ RecoveryData, onSubscribeClick }) {
  const { sleep = 0, workoutRecovery = 0, relaxation = 0 } = RecoveryData;
  const [report, setReport] = useState(null); // State to store the generated report
  const [loading, setLoading] = useState(false); // Loading state for button
  const [showEmailInput, setShowEmailInput] = useState(false); // State to show/hide email input
  const [email, setEmail] = useState(''); // State for email input
  const [error, setError] = useState(''); // State for email validation error

  // Function to generate the report by calling the backend
  const generateReport = async () => {
    setLoading(true); // Set loading to true while fetching

    try {
      const response = await fetch('https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/recovery-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sleep, workoutRecovery, relaxation }),
      });

      const result = await response.json();
      setReport(result.data); // Update state with the generated report, including personalized feedback
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
      setShowEmailInput(true); // Show email input after report generation
    }
  };

  // Function to handle email validation and submission
  const handleEmailSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    alert(`Report will be sent to: ${email}`);
    // Call your backend API here to handle the email submission if necessary
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Recovery Test Report
      </Typography>

      {/* Render the personalized report if it's available */}
      {report ? (
        <div>
          <Typography variant="body1">{report.sleep}</Typography>
          <Typography variant="body1">{report.workoutRecovery}</Typography>
          <Typography variant="body1">{report.relaxation}</Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            {report.personalizedFeedback} {/* Display the personalized feedback here */}
          </Typography>
        </div>
      ) : (
        <Typography variant="body1">
          {/* Display default values if no report is available */}
          Your recovery data:
          <br />- {sleep} hours of sleep
          <br />- {workoutRecovery} minutes spent on workout recovery
          <br />- {relaxation} minutes of relaxation/meditation
        </Typography>
      )}

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <button
          className="generate-report-btn"
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '7px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onClick={generateReport}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1976d2')}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </Box>

      {/* Email input and submit button */}
      {showEmailInput && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              marginRight: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleEmailSubmit}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Submit
          </button>
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
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
