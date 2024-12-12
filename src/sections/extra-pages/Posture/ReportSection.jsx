import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const API_ENDPOINT = 'https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/posture';

export default function ReportSection({ postureData, onSubscribeClick }) {
  const { posture } = postureData;
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    if (!posture) return;
    setLoading(true);
    setError(null);
    setReport('');

    try {
      const response = await fetch(`${API_ENDPOINT}/${posture}`);
      const data = await response.json();

      if (response.ok) {
        setReport(data.report);
      } else {
        setError(data.error || 'Failed to fetch report.');
      }
    } catch (err) {
      setError('An error occurred while fetching the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Posture Test Report
      </Typography>
      {!report && !loading && (
        <Typography variant="body1">
        Please select a posture from the options to get your report.
      </Typography>
      
      )}
      <br />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : report ? (
        <>
          <Typography variant="body1">
            {report}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/Diet" // Adjust this route as necessary
            style={{ float: 'right', marginTop: '20px' }}
          >
            Next
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={fetchReport} disabled={!posture}  >
          Submit
        </Button>
        
      )} 
      <br />
      <br />
      <br />
      <br />
      <Typography>
        {/* <Link
          style={{
            textDecoration: 'underline',
            fontWeight: 'bold',
            color: '#FF4500',
          }}
          onClick={onSubscribeClick} // Optionally trigger a function
        >
          Subscribe
        </Link> for tracking your learning and for insights. */}
      </Typography>
      <br />
    </Paper>
  );
}
