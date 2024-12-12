import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider
import Free from 'sections/landing/Free';

// Project imports
import DietHeader from 'sections/extra-pages/Diet/diethead';
import DietReportSection from 'sections/extra-pages/Diet/ReportSection';
import DietQuestionSection from 'sections/extra-pages/Diet/QuestionSection';

export default function DietTest() {
  const [dietData, setDietData] = useState({
    veggies: 0,
    protein: 0,
    grains: 0,
    nutsSeeds: 0,
    dairy: 0,
    fruits: 0,
  });
  const [recommendation, setRecommendation] = useState(null);

  // Function to fetch the recommendation from DynamoDB moved to DietReportSection
  const handleAnswerChange = (field, value) => {
    setDietData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const freeSectionRef = useRef(null);
  const scrollToNewsletter = () => {
    freeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Diet Test - Personalized Nutrition Assessment</title>
        <meta property="og:title" content="Diet Test - Personalized Nutrition Assessment" />
        <meta property="og:description" content="Take a personalized diet test to assess your nutrition intake, including vegetables, protein, grains, nuts, and more. Generate a custom report for a healthier diet." />
        <meta name="description" content="Take a personalized diet test to assess your nutrition intake, including vegetables, protein, grains, nuts, and more. Generate a custom report for a healthier diet." />
        <meta name="keywords" content="diet, nutrition, health, vegetables, protein, grains, nuts, seeds, dairy, fruits" />
        <meta property="og:image" content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg" />
        <meta property="og:url" content="https://dyadichealth.com/diet" />
        <meta property="og:type" content="website" />
        {/* Viewport meta tag for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Helmet>

      {/* Full-width DietHeader */}
      <Box sx={{ width: '100%', padding: '20px 0' }}>
        <DietHeader />
      </Box>

      {/* Main Content Section: centered inside a container */}
      <Container sx={{ mb: 12 }}>
        <Grid container spacing={4}>
                    {/* Left Side: Diet Report Section */}
          <Grid item xs={12} md={6}>
            <DietReportSection 
              dietData={dietData}
              recommendation={recommendation}
              onRecommendationChange={setRecommendation} // Passing down the set function
              onSubscribeClick={scrollToNewsletter}
            />
          </Grid>
                    {/* Right Side: Diet Question Section */}
          <Grid item xs={12} md={6}>
            <DietQuestionSection
              onAnswerChange={handleAnswerChange}
              dietData={dietData}
            />
          </Grid>
        </Grid>
      </Container>

      <div ref={freeSectionRef}>
        {/* <Free /> */}
      </div>
    </HelmetProvider>
  );
}
