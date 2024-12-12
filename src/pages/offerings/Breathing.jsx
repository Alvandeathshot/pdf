import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'; // Importing Button from Material-UI

// project imports
import Foundationheader from 'sections/extra-pages/Breathing/Breathingheader';
import Free from 'sections/landing/Free';
import BreathingExercise from 'sections/extra-pages/Breathing/BreathingExercise.jsx';

// ==============================|| ABOUT US - MAIN ||============================== //

export default function Breathing() {
  const [breathsPerMinute, setBreathsPerMinute] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [breathHoldTime, setBreathHoldTime] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showGeneratingMessage, setShowGeneratingMessage] = useState(false);
  const [showFinalReport, setShowFinalReport] = useState(false);

  const handleTestChange = (type, value) => {
    if (type === 'breathsPerMinute') {
      setBreathsPerMinute(value);
    } else if (type === 'bmi') {
      setBmi(value);
    } else if (type === 'breathHoldTime') {
      setBreathHoldTime(value);
    } else if (type === 'generateReport') {
      setShowGeneratingMessage(true);
      setShowFinalReport(false);
      setTimeout(() => {
        setShowGeneratingMessage(false);
        setShowFinalReport(true);
        setReportGenerated(true);
      }, 3000);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Foundation - Breathing and Health Tests</title>
        <meta name="description" content="Discover essential breathing and health tests designed to assess your BMI, breaths per minute, and breath-hold time. Receive personalized reports and actionable health insights to improve your well-being." />
        <meta name="keywords" content="breathing, health tests, BMI, breaths per minute, dyadic breathing exercises, breathing synchronization in relationships, interpersonal breathing exercises, breathwork for couples, shared breathing techniques for intimacy, dyadic respiration therapy, partner breathing assessment, breathing exercises for emotional bonding, synchronizing breath in relationships, breathing tests for couple therapy, breath regulation in dyadic interactions, breathing techniques for relationship stress, dyadic breath-hold exercise, emotional alignment, partner breath-hold challenge, relational harmony, breath analysis in intimate partnerships" />
        <meta property="og:title" content="Foundation - Breathing and Health Tests" />
        <meta property="og:description" content="Take foundational breathing and health tests to measure your BMI, breaths per minute, and breath-hold time. Get personalized health reports and insights." />
        <meta property="og:image" content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg" />
        <meta property="og:url" content="https://dyadichealth.com/Foundation" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dyadichealth.com/Foundation" />
        {/* Viewport meta tag for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Helmet>

      <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ mb: 12 }}>
        <Grid item xs={12}>
          <Foundationheader />
        </Grid>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', py: 6 }}>
                <Stack spacing={2}>
                  <Typography align="center" variant="h2">
                    Breathing
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    Let's start at a very basic parameter level of health functioning which is Breathing...
                  </Typography>
                  {/* Render reports */}
                  {breathsPerMinute && (
                    <Typography align="center" color="text.secondary">
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>You entered {breathsPerMinute} breaths per minute</span>...
                    </Typography>
                  )}
                  {breathHoldTime && (
                    <Typography align="center" color="text.secondary">
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>You held your breath for {breathHoldTime} seconds</span>...
                    </Typography>
                  )}
                  {showGeneratingMessage && (
                    <Typography align="center" color="text.secondary">
                      Generating final report based on the tests...
                    </Typography>
                  )}
                  {showFinalReport && generateDetailedReport()}
                  {bmi && breathsPerMinute && breathHoldTime && !reportGenerated && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, alignSelf: 'center' }}
                      onClick={() => handleTestChange('generateReport', true)}
                    >
                      Generate Report
                    </Button>
                  )}
                </Stack>
                
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ py: 6 }}>
                <BreathingExercise onTestChange={handleTestChange} />
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Grid item xs={12} sm={10} lg={9}>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}></Container>
        </Grid>
        <Container>
          {/* <Free /> */}
        </Container>
      </Grid>
    </HelmetProvider>
  );
}