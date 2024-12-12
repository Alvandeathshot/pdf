import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet for SEO
import IntroHeader from 'src/sections/extra-pages/Introduction/introhead.jsx';
import LeftContainer from 'src/sections/extra-pages/Introduction/LeftContainer';
import RightContainer from 'src/sections/extra-pages/Introduction/RightContainer';

export default function Introduction() {
  return (
    <>
      <HelmetProvider>
        {/* SEO Section using React Helmet */}
        <Helmet>
          <title>Introduction to Dyadic Health - Your Path to Wellness</title>
          <meta
            name="description"
            content="Explore Dyadic Health's Introduction page, where you can take the posture test and receive personalized recommendations for improving your posture and overall health."
          />
          <meta
            name="keywords"
            content="Dyadic Health, posture test, healthy posture, BMI analysis, relationship health, nutrition assessment, wellness, personalized health recommendations, dyadic partnerships"
          />
          <meta
            property="og:title"
            content="Introduction to Dyadic Health - Personalized Wellness Insights"
          />
          <meta
            property="og:description"
            content="Learn about Dyadic Health and take the posture test to receive tailored recommendations for enhancing your posture and maintaining a healthy lifestyle."
          />
          <meta
            property="og:image"
            content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg"
          />
          <meta property="og:url" content="https://dyadichealth.com/introduction" />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://dyadichealth.com/introduction" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
        </Helmet>

        {/* Full-width Header */}
        {/* <Box sx={{ width: '100%', padding: '20px 0' }}>
        
      </Box> */}
      <IntroHeader />

        {/* Main Content Section */}
        <Container>
          <Grid container spacing={0}>
            {/* <LeftContainer /> */}
            <RightContainer />
          </Grid>
        </Container>
      </HelmetProvider>
    </>
  );
}
