import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet';

// project imports
import Intro from 'src/pages/offerings/introduction.jsx';
import Breathing from 'src/pages/offerings/Breathing.jsx';
import Posture from 'src/pages/offerings/posture.jsx';
import Diet from 'src/pages/offerings/diet.jsx';
import Workout from 'src/pages/offerings/workout.jsx';
import Recovery from 'src/pages/offerings/recovery.jsx';

export default function Intropuction() {
  // Define the sections in an array
  const sections = [<Intro />, <Breathing />, <Posture />, <Diet />, <Workout />, <Recovery />];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Handle navigation to the next section
  const handleNext = () => {
    setCurrentSectionIndex(prevIndex => (prevIndex + 1) % sections.length); // Cycle through the sections
  };

  return (
    <>
      <Helmet>
        <title>About Us - Healthy Lifestyle System</title>
        <meta name="description" content="Learn more about Healthy Lifestyle System (HLS), a self-paced and application-led series of learnings to adopt a healthy living style." />
        <meta name="keywords" content="Healthy Lifestyle, HLS, healthy living, self-paced learning, dyad living, wellness" />
      </Helmet>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 12 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            {/* Render the current section based on the current index */}
            {sections[currentSectionIndex]}

            {/* Button to navigate to the next section */}
            <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
