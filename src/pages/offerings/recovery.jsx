import React, { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Project imports
import RecoveryHeader from 'sections/extra-pages/Recovery/recoveryhead';
import RecoveryReportSection from 'sections/extra-pages/Recovery/ReportSection';
import RecoveryQuestionSection from 'sections/extra-pages/Recovery/QuestionSection';
import Free from 'sections/landing/Free';

export default function PostureTest() {
  // Initialize RecoveryData to store user's answers
  const [RecoveryData, setData] = useState({
    sleep: 0,
    workoutRecovery: 0,
    relaxation: 0,
  });

  const handleAnswerChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Create a ref for the Free component (newsletter section)
  const freeSectionRef = useRef(null);

  // Function to scroll to the Free section
  const scrollToNewsletter = () => {
    if (freeSectionRef.current) {
      freeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HelmetProvider>
      <>
        {/* SEO metadata */}
        <Helmet>
          <title>Recovery Analysis - Improve Your Well-Being Together</title>
          <meta property="og:title" content="Recovery Analysis - Improve Your Well-Being Together" />
          <meta
            name="description"
            content="Evaluate your posture and recovery using our interactive posture test. Get insights into your sleep, workout recovery, and relaxation levels."
          />
          <meta
            name="keywords"
            content="Posture test, recovery analysis, sleep, 
            Recovery analysis in relationships, Dyadic recovery assessment, 
            Partner recovery analysis, Emotional recovery in couples, 
            Recovery practices for couples, Joint recovery strategies, 
            Couples recovery dynamics, Recovery metrics for partners, 
            Dyadic health recovery, Relationship recovery evaluation, 
            Collaborative recovery methods, Recovery and relationship wellness, 
            Recovery insights for couples, Relationship stress recovery, 
            Shared recovery experiences, Dyadic recovery interventions, 
            Recovery patterns in relationships, Relationship resilience and recovery, 
            Partner recovery tracking, Holistic recovery analysis for couples, workout recovery, relaxation"
          />
          <meta property="og:description" content="Take the recovery analysis test to assess your posture, sleep, and workout recovery. Discover personalized strategies for enhancing your overall well-being." />
          <meta property="og:image" content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg" />
          <meta property="og:url" content="https://dyadichealth.com/recovery" />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://dyadichealth.com/recovery" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
        </Helmet>

        {/* Full-width RecoveryHeader */}
        <Box sx={{ width: '100%', padding: '20px 0' }}>
          <RecoveryHeader />
        </Box>

        {/* Main Content Section: centered inside a container */}
        <Container sx={{ mb: 12 }}>
          <Grid container spacing={4}>
            {/* Left Side: Report Section */}
            <Grid item xs={12} md={6}>
              <RecoveryReportSection RecoveryData={RecoveryData} onSubscribeClick={scrollToNewsletter} />
            </Grid>

            {/* Right Side: Question Section */}
            <Grid item xs={12} md={6}>
              <RecoveryQuestionSection
                onAnswerChange={handleAnswerChange}
                RecoveryData={RecoveryData} // Pass the current values for the sliders
              />
            </Grid>
          </Grid>
        </Container>
        
        {/* <Free ref={freeSectionRef} /> Pass ref to Free component */}
      </>
    </HelmetProvider>
  );
}
