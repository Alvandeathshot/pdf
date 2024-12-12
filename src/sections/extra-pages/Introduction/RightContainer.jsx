import React, { useRef } from 'react';
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import BMI from 'src/sections/extra-pages/Introduction/bmipart';
import Free from 'sections/landing/Free';

const RightContainer = () => {
  const newsletterRef = useRef(null);

  // const scrollToNewsletter = () => {
  //   if (newsletterRef.current) {
  //     newsletterRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <>
      <Grid item xs={12} md={12}>
        <Card elevation={3} sx={{ padding: '5px' }}>
          <CardContent>
            <Typography paragraph>
              At a fundamental level, the aspects of breathing, posture, diet, workouts, and recovery form the base of dyadic health, which refers to the interconnected physical, mental, and emotional well-being between two individuals (e.g., partners, teammates). These elements contribute individually and collectively to the foundation of holistic health.
            </Typography>
            <Typography paragraph>
              A parameter of BMI is the most fundamental unit where we can start the health analysis. While we start with it, we take it further with the remaining parameters.
            </Typography>
            <Typography paragraph>
              {/* <Link
                style={{
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  color: '#FF4500',
                }}
                onClick={scrollToNewsletter}
              >
                Subscribe
              </Link> */}
              {/* &nbsp;for tracking your learning and for insights. */}
            </Typography>
            <BMI />
          </CardContent>
        </Card>
      </Grid>
      <Container ref={newsletterRef}>
        {/* <Free /> */}
      </Container>
    </>
  );
};

export default RightContainer;
