import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse'; // Import Collapse component
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Arrow for expanded state
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'; // Arrow for collapsed state

// Import your components
import Intro from 'sections/extra-pages/Introduction/bmicalculator';
import Breathing from 'sections/extra-pages/Breathing/BreathingExercise';
import Posture from 'sections/extra-pages/Posture/QuestionSection';
import Diet from 'sections/extra-pages/Diet/QuestionSection';
import Workout from 'sections/extra-pages/Workouts/QuestionSection';
import Recovery from 'sections/extra-pages/Recovery/QuestionSection';
import GetReport from 'sections/extra-pages/getreport/getreport';

// Import icons for buttons
import foundation from 'assets/images/landing/foundation.svg';
import breath from 'assets/images/landing/breath.svg';
import posture from 'assets/images/landing/posture.svg';
import diet from 'assets/images/landing/diet.svg';
import workout from 'assets/images/landing/workout.svg';
import recovery from 'assets/images/landing/recovery.svg';
import getreport from 'assets/images/landing/getreport1.svg';

export default function IntroductionPage() {
  const sections = [
    { title: 'Introduction', icon: foundation, Component: Intro },
    { title: 'Breathing', icon: breath, Component: Breathing },
    { title: 'Posture', icon: posture, Component: Posture },
    { title: 'Diet', icon: diet, Component: Diet },
    { title: 'Workouts', icon: workout, Component: Workout },
    { title: 'Recovery', icon: recovery, Component: Recovery },
    { title: 'Get Report', icon: getreport, Component: GetReport },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completionStatus, setCompletionStatus] = useState(
    Array(sections.length).fill(false)
  );
  const [expandedSection, setExpandedSection] = useState(null); // Tracks the currently expanded section

  // for BMI data
  const [bmiData, setBmiData] = useState({
    height: localStorage.getItem('height') || '',
    weight: localStorage.getItem('weight') || '',
    bmi: localStorage.getItem('bmi') || null,
  });
  const [breathingData, setBreathingData] = useState({
    breathHoldTime: localStorage.getItem('breathHoldTime') || 0,
    breathsPerMinute: localStorage.getItem('breathsPerMinute') || '',
  });

  const [postureData, setPostureData] = useState({
    selectedPosture: localStorage.getItem('selectedPosture') || '',
    report: localStorage.getItem('postureReport') || '',
  });
  const initialDietData = JSON.parse(localStorage.getItem("dietData")) || {
    veggies: 0,
    protein: 0,
    grains: 0,
    nutsSeeds: 0,
    dairy: 0,
    fruits: 0,
    // recommendation: "",
  };
  const [dietData, setDietData] = useState(initialDietData);

  const initialWorkoutData = JSON.parse(localStorage.getItem("workoutData")) || {
    cardio: 0,
    stretching: 0,
    resistance: 0,
  };
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);

  const initialRecoveryData = JSON.parse(localStorage.getItem('recoveryData')) || {
    sleepTime: '22:00',
    wakeTime: '06:00',
    workoutRecovery: 0,
    relaxation: 0,
    calculatedSleepHours: 8,
  };
  
  const [recoveryData, setRecoveryData] = useState(initialRecoveryData);
  // Update local storage whenever BMI data changes
  useEffect(() => {
    localStorage.setItem('height', bmiData.height);
    localStorage.setItem('weight', bmiData.weight);
    localStorage.setItem('bmi', bmiData.bmi);
  }, [bmiData]);
  useEffect(() => {
    localStorage.setItem('breathHoldTime', breathingData.breathHoldTime);
    localStorage.setItem('breathsPerMinute', breathingData.breathsPerMinute);
  }, [breathingData]);
  useEffect(() => {
    localStorage.setItem('selectedPosture', postureData.selectedPosture);
    localStorage.setItem('postureReport', postureData.report);
  }, [postureData]);
  useEffect(() => {
    localStorage.setItem('veggies', dietData.veggies);
    localStorage.setItem('protein', dietData.protein);
    localStorage.setItem('grains', dietData.grains);
    localStorage.setItem('nutsSeeds', dietData.nutsSeeds);
    localStorage.setItem('dairy', dietData.dairy);
    localStorage.setItem('fruits', dietData.fruits);
    // localStorage.setItem('dietRecommendation', dietData.recommendation);
  }, [dietData]);

  useEffect(() => {
    const updatedDietData = {
       veggies: parseInt(localStorage.getItem('veggies')) || 0,
       protein: parseInt(localStorage.getItem('protein')) || 0,
       grains: parseInt(localStorage.getItem('grains')) || 0,
       nutsSeeds: parseInt(localStorage.getItem('nutsSeeds')) || 0,
       dairy: parseInt(localStorage.getItem('dairy')) || 0,
       fruits: parseInt(localStorage.getItem('fruits')) || 0,
    };
    setDietData(updatedDietData);
 }, []);
 useEffect(() => {
  const updatedWorkoutData = {
     cardio: parseInt(localStorage.getItem('cardio')) || 0,
     stretching: parseInt(localStorage.getItem('stretching')) || 0,
     resistance: parseInt(localStorage.getItem('resistance')) || 0,
  };
  setWorkoutData(updatedWorkoutData);
}, []);
useEffect(() => {
  localStorage.setItem("dietData", JSON.stringify(dietData));
}, [dietData]);

useEffect(() => {
  localStorage.setItem("workoutData", JSON.stringify(workoutData));
}, [workoutData]);useEffect(() => {
    localStorage.setItem("dietData", JSON.stringify(dietData));
}, [dietData]);

useEffect(() => {
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
}, [workoutData]);

  const steps = sections.map((section, index) => ({
    label: section.title,
    completed: completionStatus[index],
  }));

  const handleNext = () => {
    setCompletionStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[currentSectionIndex] = true;
      return updatedStatus;
    });
    console.log('Current BMI Data:', bmiData);
    console.log('Current Breathing Data:', breathingData);
    console.log('Current Posture Data:', postureData);
    console.log('Current Diet Data:', dietData);
    console.log(`Navigating to section: ${sections[(currentSectionIndex + 1) % sections.length].title}`);
    setCurrentSectionIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };


  // Handle manual selection of sections
  const handleSectionSelect = (index) => {
    if (index <= currentSectionIndex) {
      setCurrentSectionIndex(index);
    }
  };

  // Mark the current section as completed
  const markSectionComplete = () => {
    setCompletionStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[currentSectionIndex] = true; // Mark current section as complete
      return updatedStatus;
    });
  };
  useEffect(() => {
    localStorage.setItem('recoveryData', JSON.stringify(recoveryData));
  }, [recoveryData]);

  // Get the current section's component
  const CurrentSectionComponent = sections[currentSectionIndex].Component;
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
  });
  
  // Updated handleSendReport to include userDetails
  const handleSendReport = async () => {
    const dietData = JSON.parse(localStorage.getItem("dietData"));
    const workoutData = JSON.parse(localStorage.getItem("workoutData"));
  
    const data = {
      bmiData,
      breathingData,
      postureData,
      dietData,
      workoutData,
      recoveryData,
      userDetails,
    };
  
    console.log("Data being sent to the backend:", data);
  
    try {
      const response = await fetch(
        "https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error sending report:", error);
      alert("Failed to send the report.");
    }
  };

   const handleSectionToggle = (index) => {
    setExpandedSection((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 12 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#37474f',
          mb: 3,
          fontSize: { xs: '28px', sm: '24px', md: '30px' },
        }}
      >
        Foundation Assessment
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box>
            {sections.map((section, index) => (
              <Box key={index}>
                <Button
                  fullWidth
                  variant={expandedSection === index ? 'contained' : 'outlined'}
                  onClick={() => handleSectionToggle(index)}
                  sx={{
                    my: 1,
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    borderRadius: 3,
                    backgroundColor: expandedSection === index ? '#19a4d2' : '#f5f5f5',
                    color: expandedSection === index ? '#fff' : '#37474f',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={section.icon}
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      borderRadius: '50%',
                    }}
                  />
                  <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
                    {section.title}
                  </Typography>
                  <Box sx={{ ml: 'auto' }}>
                    {expandedSection === index ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Box>
                </Button>

                <Collapse in={expandedSection === index}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: 'white',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      mt: 2,
                    }}
                  >
                    <section.Component
                      markComplete={markSectionComplete}
                      bmiData={bmiData}
                      setBmiData={setBmiData}
                      breathingData={breathingData}
                      setBreathingData={setBreathingData}
                      postureData={postureData}
                      setPostureData={setPostureData}
                      dietData={dietData}
                      setDietData={setDietData}
                      workoutData={workoutData}
                      setWorkoutData={setWorkoutData}
                      recoveryData={recoveryData}
                      setRecoveryData={setRecoveryData}
                      userDetails={userDetails}
                      setUserDetails={setUserDetails}
                    />
                    {currentSectionIndex < sections.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!completionStatus[currentSectionIndex]} // Disable if not completed
                    sx={{
                      mt: { xs: 4, sm: 5, md: 5, lg: 5, xl: 8 },
                      ml: { xs: 0, sm: 3, md: 30, lg: 30, xl: 75 },
                      alignSelf: 'center',
                      display: 'block',
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#155a9c' },
                    }}
                  >
                    Next Section
                  </Button>
                )}
              {currentSectionIndex === sections.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleSendReport}
                  sx={{
                    mt: 3,
                    alignSelf: 'center',
                    display: 'block',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155a9c' },
                  }}
                >
                  Send Report
                </Button>
              )}
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
