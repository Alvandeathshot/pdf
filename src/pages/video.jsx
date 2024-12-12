// // src/pages/Video.jsx
// import React from 'react';
// import Container from '@mui/material/Container';
// import { useLocation } from 'react-router-dom';
// import VideoGallerySection from 'src/sections/extra-pages/video/VideoGallerySection'; // Adjust the path accordingly
// import videoListData from 'src/data/videoList.js'; // Import your default video list from the file
// import { Helmet } from 'react-helmet';

// export default function Video(isSection = false) {
//   const location = useLocation();

//   // Check if videoList and videosPlayed are provided in location.state, else fallback to default values
//   const videosFromState = location.state?.videoList || videoListData; // Fallback to imported videoList
//   const videosPlayed = location.state?.videosPlayed || []; // Default to an empty array if videosPlayed is missing

//   const handleVideoEnd = (updatedViewedVideos) => {
//     console.log('Updated viewed videos:', updatedViewedVideos);
//     // Here you can save this updated list to local storage, send it to a backend, etc.
//   };

//   return (
//     <Container style={{ padding: '20px', paddingTop: '80px' }}>
//       <Helmet>
//         <title>Course Videos | Dyadic Health</title> 
//         <meta name="description" content="Explore our video gallery covering various topics related to Dyadic Health." />
//         <meta name="keywords" content="Dyadic Health, Videos, Health Education" />
//         <link rel="canonical" href="https://dyadichealth.com/course" />
//       </Helmet>
//       <h1>Course Page</h1>
//       {videosFromState.length > 0 ? (
//         <VideoGallerySection
//           videoList={videosFromState} // Use either state or default video list
//           videosPlayed={videosPlayed}
//           onVideoEnd={handleVideoEnd}
//         />
//       ) : (
//         <p>No videos to display</p>
//       )}
//     </Container>
//   );
// }








import React, { useState } from 'react';
import { Box, Typography, Grid, Container, Card, CardContent, CardMedia, Divider, Stack, Button, IconButton, Paper, Rating,Tooltip, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import { Notifications, Description, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon } from '@mui/icons-material';

const VideoLayout = () => {
  const initialVideos = [
    { id: 'm2olel6lwA0?si=ensxylWU1lkAmFrO', title: 'Introduction to Dyadic Health', description: 'Overview of the course.', completed: false, rating: 0, transcript: 'This is the transcript for the Introduction video.' },
    { id: 'aOkQsGCT6jo?si=TtOYyRx0iWS7gMx1', title: 'Lesson 1: Basics', description: 'Understanding the basics.', completed: false, rating: 0, transcript: 'This is the transcript for Lesson 1: Basics.' },
    { id: '3JZ_D3ELwOQ', title: 'Lesson 2: Advanced Concepts', description: 'Diving deeper into advanced topics.', completed: false, rating: 0, transcript: 'This is the transcript for Lesson 2: Advanced Concepts.' },
    { id: 'L_jWHffIx5E', title: 'Lesson 3: Final Thoughts', description: 'Wrapping up the course.', completed: false, rating: 0, transcript: 'This is the transcript for Lesson 3: Final Thoughts.' },
  ];

  const [mainVideoId, setMainVideoId] = useState(initialVideos[0].id);
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [announcement, setAnnouncement] = useState('New updates available! Check out the latest lesson.');

  // Like/Dislike States
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  
  const handleThumbnailClick = (clickedVideoId, index) => {
    if (!videos[index].completed) {
      setMainVideoId(clickedVideoId);
      setCurrentLesson(index);
    }
  };

  const handleMarkAsCompleted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const updatedVideos = videos.map((video, index) =>
        index === currentLesson ? { ...video, completed: true } : video
      );
      setVideos(updatedVideos);
    }, 2000);
  };

  const handleNextLesson = () => {
    if (currentLesson < videos.length - 1) {
      setMainVideoId(videos[currentLesson + 1].id);
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setMainVideoId(videos[currentLesson - 1].id);
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleLike = () => {
    if (userLiked) {
      setLikeCount(likeCount - 1);
      setUserLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      if (userDisliked) {
        setDislikeCount(dislikeCount - 1);
        setUserDisliked(false);
      }
      setUserLiked(true);
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setDislikeCount(dislikeCount - 1);
      setUserDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      if (userLiked) {
        setLikeCount(likeCount - 1);
        setUserLiked(false);
      }
      setUserDisliked(true);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Course Info Section */}
      <Box textAlign="center" my={4} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, padding: 3, mt: 12 }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main">Dyadic Health Course</Typography>
        <Typography variant="subtitle1" color="textSecondary">Learn about the fundamentals of Dyadic Health in this comprehensive course.</Typography>
      </Box>

      {/* Notifications Bar */}
      <Box sx={{ backgroundColor: '#f3f4f6', padding: '10px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
        <Typography variant="body2" color="textSecondary">{announcement}</Typography>
        <IconButton color="primary">
          <Notifications />
        </IconButton>
      </Box>

      {/* Main Video Section */}
      <Box my={4}>
        <Typography variant="h5" gutterBottom>Current Lesson</Typography>
        <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%', backgroundColor: 'black', borderRadius: 2, boxShadow: 3 }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=1&cc_load_policy=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
          ></iframe>
        </Box>

          {/* Description for Main Video (Updated UI) */}
  <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, padding: 3, mt: 2 }}>
  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
    <Stack direction="row" spacing={2} alignItems="center">
      <Description color="primary" sx={{ fontSize: 30 }} />
      <Typography variant="h6" fontWeight="bold">Lesson Description</Typography>
    </Stack>
            {/* Like and Dislike Buttons */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Tooltip title="Like">
              <IconButton onClick={handleLike} color={userLiked ? 'primary' : 'default'}>
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">{likeCount} Likes</Typography>

            <Tooltip title="Dislike">
              <IconButton onClick={handleDislike} color={userDisliked ? 'error' : 'default'}>
                <ThumbDownIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">{dislikeCount} Dislikes</Typography>
          </Stack>
    </Stack>
  
    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
      {videos[currentLesson].description}
    </Typography>
  </Box>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handlePreviousLesson}
          sx={{ borderRadius: '8px', padding: '10px 20px' }}
          disabled={currentLesson === 0}
        >
          Previous Lesson
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="secondary"
          onClick={handleMarkAsCompleted}
          sx={{ borderRadius: '8px', padding: '10px 20px' }}
          disabled={videos[currentLesson].completed}
        >
          Mark as Completed
        </LoadingButton>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleNextLesson}
          sx={{ borderRadius: '8px', padding: '10px 20px' }}
          disabled={currentLesson === videos.length - 1}
        >
          Next Lesson
        </Button>
      </Stack>

      {/* Course Outline Section */}
      <Box my={4}>
        <Typography variant="h5" gutterBottom>Course Outline</Typography>
        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  cursor: video.completed ? 'default' : 'pointer',
                  boxShadow: mainVideoId === video.id ? 6 : 2,
                  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s',
                  '&:hover': video.completed ? {} : { boxShadow: 6, transform: 'scale(1.05)' },
                  border: mainVideoId === video.id ? '2px solid #3f51b5' : 'none',
                  borderRadius: 2,
                  opacity: video.completed ? 0.5 : 1, // Dim completed videos
                }}
                onClick={() => handleThumbnailClick(video.id, index)}
              >
                <CardMedia
                  component="iframe"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`Video thumbnail - ${video.title}`}
                  sx={{
                    height: 150,
                    width: '100%',
                    border: 0,
                    borderRadius: '4px',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>{video.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{video.description}</Typography>
                  {video.completed && (
                    <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon sx={{ fontSize: 14, marginRight: 1 }} /> Completed
                    </Typography>
                  )}
                  <Rating
                    value={video.rating}
                    onChange={(event, newValue) => {
                      const updatedVideos = [...videos];
                      updatedVideos[index].rating = newValue;
                      setVideos(updatedVideos);
                    }}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  <LinearProgress
                    variant="determinate"
                    value={video.completed ? 100 : 0}
                    sx={{ mt: 1 }}
                    color="secondary"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
    </Container>
  );
};

export default VideoLayout;