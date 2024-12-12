import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const BreathingExercise = ({ breathingData, setBreathingData, onSectionComplete }) => {
  const [breathHoldTime, setBreathHoldTime] = useState(breathingData.breathHoldTime || 0);
  const [breathsPerMinute, setBreathsPerMinute] = useState(breathingData.breathsPerMinute || '');
  const [isBreathTimerRunning, setIsBreathTimerRunning] = useState(false);
  const [breathTimer, setBreathTimer] = useState(60);
  const [isBreathHolding, setIsBreathHolding] = useState(false);

  const intervalId = useRef(null);

  useEffect(() => {
    if (isBreathTimerRunning && breathTimer > 0) {
      const countdown = setInterval(() => {
        setBreathTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (breathTimer === 0) {
      setIsBreathTimerRunning(false);
    }
  }, [isBreathTimerRunning, breathTimer]);

  const startBreathCountTimer = () => {
    setIsBreathTimerRunning(true);
    setBreathTimer(5);
  };

  const handleBreathHoldStart = () => {
    setIsBreathHolding(true);
    const startTime = new Date().getTime();

    intervalId.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeHeld = Math.floor((currentTime - startTime) / 1000);
      setBreathHoldTime(timeHeld);

      // Update parent state
      setBreathingData((prevData) => ({
        ...prevData,
        breathHoldTime: timeHeld,
      }));
    }, 1000);
  };

  const handleBreathHoldStop = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      setIsBreathHolding(false);
      intervalId.current = null;

      // Update parent state when breath hold is stop
      setBreathingData((prevData) => ({
        ...prevData,
        breathHoldTime,
      }));
    }
  };

  const handleBreathCountChange = (value) => {
    setBreathsPerMinute(value);
    setBreathingData((prevData) => ({
      ...prevData,
      breathsPerMinute: value,
    }));
  };

  useEffect(() => {
    if (breathsPerMinute && breathHoldTime) {
      onSectionComplete?.();
    }
  }, [breathsPerMinute, breathHoldTime, onSectionComplete]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250vw',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
        maxWidth: '500px',
        margin: '0 auto',
        borderRadius: 2,
        '@media (max-width: 768px)': {
      width: '80%', // More flexible for smaller screens
    },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#e6f7ff',
          borderRadius: 2,
          padding: 2,
          width: '150%',
          textAlign: 'left',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Let's Take a Breath Test
        </Typography>
        <Box
          sx={{
            marginBottom: 3,
            width: '100%',
            textAlign: 'left',
            padding: 2,
            backgroundColor: '#ffffff',
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Number of Breaths Per Minute
          </Typography>
          <Button variant="contained" onClick={startBreathCountTimer}>
            Start 1-minute Timer
          </Button>
          {isBreathTimerRunning && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              ⏰ Time left: {breathTimer} seconds
            </Typography>
          )}
          {!isBreathTimerRunning && breathTimer === 0 && (
            <TextField
              type="string"
              placeholder="Enter number of breaths"
              value={breathsPerMinute}
              onChange={(e) => handleBreathCountChange(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            />
          )}
        </Box>

        <Box
          sx={{
            marginBottom: 3,
            width: '100%',
            textAlign: 'left',
            padding: 2,
            backgroundColor: '#ffffff',
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Hold Your Breath
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Press and hold to start the timer, release to stop.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onMouseDown={handleBreathHoldStart}
            onMouseUp={handleBreathHoldStop}
            onTouchStart={handleBreathHoldStart}
            onTouchEnd={handleBreathHoldStop}
          >
            Hold Breath
          </Button>
          {isBreathHolding && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              ⏱ Holding breath: {breathHoldTime} seconds
            </Typography>
          )}
          {!isBreathHolding && breathHoldTime > 0 && (
            <Typography variant="body1" color="success" sx={{ mt: 2 }}>
              You held your breath for {breathHoldTime} seconds
            </Typography>
          )}
        </Box>

        {breathHoldTime > 0 && breathsPerMinute && (
          <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
            You took {breathsPerMinute} breaths per minute and held your breath for {breathHoldTime} seconds.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BreathingExercise;
