
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function VideoGallery() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure and provide default values to avoid undefined issues
  const { videoList = [], videosPlayed = [] } = location.state || {};

  // Handle case where videoList is empty
  useEffect(() => {
    if (videoList.length === 0) {
      navigate('/course');  // Navigate back to combo page if videoList is empty
    }
  }, [location, navigate, videoList.length]);

  // Default to the first video, if available
  const [currentVideo, setCurrentVideo] = useState(videoList[0]?.id || '');
  const [viewedVideos, setViewedVideos] = useState(videosPlayed);

  const handleVideoEnd = () => {
    if (currentVideo && !viewedVideos.includes(currentVideo)) {
      setViewedVideos([...viewedVideos, currentVideo]);
    }
  };

  const handleVideoSelect = (videoId) => {
    setCurrentVideo(videoId);
  };

  const videoContainerStyle = {
    height: '500px',
    position: 'relative',
    width: '100%',
  };

  const ribbonStyle = {
    maxHeight: '500px',
    overflowY: 'auto',
    backgroundColor: '#f7f7f7',
    padding: '10px',
  };

  return (
    <Container>
      {videoList.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box style={videoContainerStyle}>
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${currentVideo}`}
                style={{ width: '100%', height: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
              />
            </Box>
          </Grid>
          <Grid item xs={3} style={ribbonStyle}>
            <Typography variant="h6" gutterBottom>
              Course Videos
            </Typography>
            <Stack spacing={2}>
              {videoList.map((video) => (
                <Box
                  key={video.id}
                  onClick={() => handleVideoSelect(video.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: viewedVideos.includes(video.id) ? '#d1e7dd' : '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                  <Typography variant="body2" align="center">
                    {video.title}
                  </Typography>
                  {viewedVideos.includes(video.id) && (
                    <Typography variant="caption" color="success.main" align="center">
                      Viewed
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" align="center" gutterBottom>
          No videos available.
        </Typography>
      )}
    </Container>
  );
}
//