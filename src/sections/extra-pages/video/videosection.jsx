import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import MainCard from 'components/MainCard';
import LockIcon from '@mui/icons-material/Lock'; // Material UI lock icon
import { useNavigate } from 'react-router-dom';
import videoList from '../../../data/videoList';

export default function ComboPage() {
  const initialVideoId = videoList[0].id;
  const [selectedVideo, setSelectedVideo] = useState(initialVideoId);
  const [videosPlayed, setVideosPlayed] = useState([]);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [initialVideoPlayed, setInitialVideoPlayed] = useState(false);
  const [canWatchAllVideos, setCanWatchAllVideos] = useState(false);

  const navigate = useNavigate();

  const handleVideoSelect = (videoId) => {
    const totalVideosAllowed = 2;
    const isInitialVideo = videoId === initialVideoId;

    // Check if the video is locked
    const videoIndex = videoList.findIndex(video => video.id === videoId);
    const isLocked = videoIndex >= totalVideosAllowed && !canWatchAllVideos;

    if (isLocked) {
      // Do nothing if the video is locked
      return;
    }

    if (isInitialVideo && !initialVideoPlayed) {
      setInitialVideoPlayed(true);
      if (videosPlayed.length < totalVideosAllowed) {
        setVideosPlayed((prevPlayed) => [...prevPlayed, videoId]);
      }
      setShouldAutoplay(true);
    } else if (!isInitialVideo && !videosPlayed.includes(videoId) && (videosPlayed.length < totalVideosAllowed || canWatchAllVideos)) {
      setVideosPlayed((prevPlayed) => [...prevPlayed, videoId]);
      setShouldAutoplay(true);
    } else {
      setShouldAutoplay(false);
    }

    setSelectedVideo(videoId);
  };

  const handleInitialVideoPlay = () => {
    if (!initialVideoPlayed) {
      setInitialVideoPlayed(true);
      if (videosPlayed.length < 2 || canWatchAllVideos) {
        setVideosPlayed((prevPlayed) => [...prevPlayed, initialVideoId]);
      }
    }
  };

  const handleContinue = () => {
    navigate('/course', { state: { videoList, videosPlayed } });
  };

  const handleLearnMore = (event) => {
    event.stopPropagation(); // Prevent click propagation
    setCanWatchAllVideos(true); // Allow watching all videos
  };

  const selectedVideoData = videoList.find((video) => video.id === selectedVideo);
  const shouldShowContinueOverlay = !canWatchAllVideos && videosPlayed.length >= 2 && !videosPlayed.includes(selectedVideo);

  return (
    <Box sx={{  minHeight: '70vh', p: 3 , backgroundColor: '#ffffff' }}>
      <Container>
      <Box sx={{ marginBottom: 5, marginTop: 2, fontWeight: 'bold', color: '#37474f' }}>
          <Typography variant="h2" align="center" gutterBottom>
            Course Section
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <MainCard sx={{ height: '10cm', overflowY: 'auto', backgroundColor: '#80b3ff' }}>
              <Grid container spacing={2}>
                {videoList.map((video, index) => {
                  // Show a lock for videos beyond the first two
                  const isLocked = index >= 2 && !canWatchAllVideos;
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      onClick={() => handleVideoSelect(video.id)}
                      sx={{ cursor: isLocked ? 'not-allowed' : 'pointer' }} // Disable cursor for locked videos
                    >
                      <Stack spacing={1} alignItems="center">
                        <Typography variant="body2" align="center" noWrap>
                          {video.title}
                        </Typography>
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            image={video.thumbnail}
                            sx={{ width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain' }}
                          />
                          {isLocked && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <LockIcon sx={{ color: 'white', fontSize: '2rem' }} />
                            </Box>
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <MainCard sx={{ height: '10cm', backgroundColor: '#80b3ff' }}>
              {shouldShowContinueOverlay ? (
                <Box 
                  onClick={handleContinue} 
                  sx={{ position: 'relative', width: '100%', maxWidth: '100%', height: 0, paddingBottom: '56.25%' }}
                >
                  <CardMedia
                    component="img"
                    image={selectedVideoData.thumbnail}
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      maxHeight: '300px'
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      color: 'white', 
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                      p: '20px', 
                      borderRadius: '5px', 
                      textAlign: 'center',
                      width: '80%', 
                      maxWidth: '400px' 
                    }}
                  >
                    Do you want to continue to the course or learn more about this?
                  </Typography>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      bottom: '10%', 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      display: 'flex', 
                      gap: 2 
                    }}
                  >
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleContinue} 
                      sx={{ m: 2, padding: '10px 20px', minWidth: '180px' }}
                    >
                      Continue to Course
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent propagation to parent
                        handleLearnMore(event);
                      }} 
                      sx={{ m: 2, padding: '10px 20px', minWidth: '180px' }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
                  <Box
                    component="iframe"
                    src={`https://www.youtube.com/embed/${selectedVideo}${shouldAutoplay ? '?autoplay=1' : ''}`}
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      border: 0 
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onPlay={selectedVideo === initialVideoId ? handleInitialVideoPlay : undefined}
                  />
                </Box>
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
