import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Project imports
import Posturehead from 'sections/extra-pages/Posture/posturehead';
import ReportSection from 'sections/extra-pages/Posture/ReportSection';
import QuestionSection from 'sections/extra-pages/Posture/QuestionSection';
import Free from 'sections/landing/Free';

export default function PostureTest() {
  const [postureData, setPostureData] = useState({
    posture: '', // This will be updated by QuestionSection
  });

  // Handler to update posture data when questions are answered
  const handleAnswerChange = (field, value) => {
    setPostureData((prevData) => ({
      ...prevData,
      [field]: value, // Update the posture selected
    }));
  };

  // Create a ref for the Free component
  const freeSectionRef = useRef(null);

  // Function to scroll to the Free section
  const scrollToNewsletter = () => {
    if (freeSectionRef.current) {
      freeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Posture Test - Evaluate Your Posture for Better Health</title>
        <meta property="og:title" content="Posture Test - Evaluate Your Posture for Better Health" />
        <meta
          name="description"
          content="Take the posture test to assess your posture and learn how it impacts your overall health. Get personalized recommendations to improve your posture."
        />
        <meta
          name="keywords"
          content="posture test, posture assessment, health, posture improvement, 
          Posture test for couples, Dyadic posture alignment, 
          Posture test in intimate relationships, Posture correction for relationship wellness, 
          Couples' posture assessment, Posture and physical harmony in relationships, 
          Dyadic posture health, Posture synchronization for couples, 
          Shared posture goals in relationships, Posture improvement for relationship health, 
          Posture evaluation in dyadic wellness, Posture test for relational alignment, 
          Posture analysis in couples therapy, Posture impact on relationship dynamics, 
          Dyadic posture correction exercises, 
          Posture health and intimacy in relationships, Foundation of good posture in relationships, 
          Posture and emotional connection in couples, Couples' posture test for improved health, 
          Posture test for relational harmony, 
          Posture health foundation in dyads, Posture evaluation and couple therapy, 
          Shared posture improvement in relationships, Posture alignment for relationship well-being, 
          Posture test for physical connection in couplesback health, Posture correction, posture tips"
        />
        <meta property="og:description" content="Assess your posture with our comprehensive posture test. Understand how your posture affects your health and get tailored recommendations for improvement." />
        <meta property="og:image" content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg" />
        <meta property="og:url" content="https://dyadichealth.com/posture" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dyadichealth.com/posture" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Helmet>

      {/* Full-width Posturehead */}
      <Box sx={{ width: '100%', padding: '20px 0' }}>
        <Posturehead />
      </Box>

      {/* Main Content Section with two columns */}
      <Container sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          {/* Left Side: Report Section (for displaying the content) */}
          <Grid item xs={12} md={6}>
            <ReportSection postureData={postureData} onSubscribeClick={scrollToNewsletter} /> {/* Pass postureData and scroll function */}
          </Grid>

          {/* Right Side: Question Section (for displaying posture options) */}
          <Grid item xs={12} md={6}>
            <QuestionSection onAnswerChange={handleAnswerChange} /> {/* Handle posture selection */}
          </Grid>
        </Grid>
      </Container>

      {/* <div ref={freeSectionRef}>
        <Free /> This is your newsletter section
      </div> */}
    </HelmetProvider>
  );
}
