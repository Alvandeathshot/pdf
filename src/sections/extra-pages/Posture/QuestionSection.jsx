import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

// Import images from src/assets/posture
import flatBackImg from '../../../assets/images/posture/flatback.jpg';
import kyphoticImg from '../../../assets/images/posture/kyphotic.jpg';
import anteriorHeadImg from '../../../assets/images/posture/anterior_head.jpg';
import lordoticImg from '../../../assets/images/posture/lordotic.jpg';
import anteriorPelvicTiltImg from '../../../assets/images/posture/anterior_pelvic_tilt.jpeg';
import goodPostureImg from '../../../assets/images/posture/goodposture.jpg';

const API_ENDPOINT = 'https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/posture';

// Posture options with imported images
const POSTURE_OPTIONS = [
  { id: 'flatBack', label: 'Flat Back', image: flatBackImg },
  { id: 'kyphotic', label: 'Kyphotic', image: kyphoticImg },
  { id: 'anteriorHead', label: 'Anterior Head', image: anteriorHeadImg },
  { id: 'lordotic', label: 'Lordotic', image: lordoticImg },
  { id: 'anteriorPelvicTilt', label: 'Anterior Pelvic Tilt', image: anteriorPelvicTiltImg },
  { id: 'good', label: 'Good Posture', image: goodPostureImg },
];

export default function PostureTest({ postureData, setPostureData, onSectionComplete }) {
  const [selectedPosture, setSelectedPosture] = useState(null);
  const [fullReport, setFullReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelection = async (postureId) => {
    setPostureData({ selectedPosture: postureId, report: '' });
    setLoading(true);
    setError(null);
    setSelectedPosture(postureId); // Update selected posture state

    try {
      const response = await fetch(`${API_ENDPOINT}/${postureId}`);
      const data = await response.json();

      if (response.ok) {
        setPostureData((prevData) => ({
          ...prevData,
          report: data.report,
        }));
        onSectionComplete(); // Mark section complete
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
        Select Your Posture
      </Typography>
      <Grid container spacing={2}>
        {POSTURE_OPTIONS.map((posture) => (
          <Grid item xs={6} sm={4} key={posture.id}>
            <Card
              onClick={() => handleSelection(posture.id)}
              sx={{
                border: selectedPosture === posture.id ? '1px solid #1E90FF' : 'none', // Blue for selected, gray for non-selected
                transition: 'border 0.3s',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="120"
                  image={posture.image}
                  alt={posture.label}
                  sx={{
                    objectFit: 'contain',
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {posture.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Selected Posture Section */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Posture Test Selection
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : postureData.selectedPosture ? (
          <Typography variant="body1">
            You have selected: <strong>{POSTURE_OPTIONS.find((p) => p.id === postureData.selectedPosture)?.label}</strong>.you can proceed to next section
          </Typography>
        ) : (
          <Typography variant="body1">Select a posture to see the details.</Typography>
        )}
      </div>
    </Paper>
  );
}
