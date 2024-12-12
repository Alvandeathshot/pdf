import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Project imports
import WorkoutHeader from 'sections/extra-pages/Workouts/workouthead';
import WorkoutReportSection from 'sections/extra-pages/Workouts/ReportSection';
import WorkoutQuestionSection from 'sections/extra-pages/Workouts/QuestionSection';
import Free from 'sections/landing/Free';

export default function WorkoutTest() {
  // Initialize WorkoutData to store user's answers
  const [WorkoutData, setWorkoutData] = useState({
    WorkoutType: '',
    calorieIntake: '',
    physicalActivity: '',
  });

  // Create a ref for the Free component (newsletter section)
  const freeSectionRef = useRef(null);

  // Handler to update Workout data when questions are answered
  const handleAnswerChange = (field, value) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to scroll to the Free section
  const scrollToNewsletter = () => {
    if (freeSectionRef.current) {
      freeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Workout Test - Personalized Fitness & Health Analysis</title>
        <meta property="og:title" content="Workout Test - Personalized Fitness & Health Analysis" />
        <meta name="description" content="Take our comprehensive workout test to evaluate your fitness level, calorie intake, and physical activity. Receive personalized workout plans and insights to achieve your health goals." />
        <meta name="keywords" content="workout test, fitness evaluation, calorie intake, Dyadic workout test, Partner workout assessment, Couple fitness evaluation, Workout synchronization for couples, Relationship workout test, Partner fitness challenge, Dyadic exercise compatibility test, Couple workout effectiveness, Joint workout evaluation for partners, Fitness test for relationship health, Physical activity test for couples, Couple workout routine analysis, Partner calorie intake test, Exercise compatibility in dyadic relationships, Couple fitness harmony test, Dyadic physical activity test, Couple workout synergy, Relationship fitness alignment test, Workout intensity test for couples, Partner exercise regimen analysis, physical activity, fitness report, workout plan" />
        <meta property="og:description" content="Evaluate your workout type, calorie intake, and physical activity to get personalized health insights." />
        <meta property="og:image" content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg" />
        <meta property="og:url" content="https://dyadichealth.com/workout" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dyadichealth.com/workout" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Helmet>

      {/* Full-width WorkoutHeader */}
      <Box sx={{ width: '100%', padding: '20px 0' }}>
        <WorkoutHeader />
      </Box>

      {/* Main Content Section: centered inside a container */}
      <Container sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          {/* Left Side: Workout Report Section */}
          <Grid item xs={12} md={6}>
            <WorkoutReportSection 
              WorkoutData={WorkoutData} 
              onSubscribeClick={scrollToNewsletter} // Pass the scroll function
            />
          </Grid>

          {/* Right Side: Workout Question Section */}
          <Grid item xs={12} md={6}>
            <WorkoutQuestionSection onAnswerChange={handleAnswerChange} />
          </Grid>
        </Grid>
      </Container>
      
      {/* <Free ref={freeSectionRef} /> Pass ref to Free component */}
    </HelmetProvider>
  );
}
