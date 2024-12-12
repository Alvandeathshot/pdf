import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Box, Paper,Button } from "@mui/material";
import { Table, TableBody, TableCell, TableRow, TableContainer } from "@mui/material";

// Counter Component
const CounterComponent = ({ value, onChange, max }) => {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) onChange(value - 1);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    const parsedValue = parseInt(inputValue, 10);

    if (inputValue === "") {
      onChange(0); // Reset to minimum
    } else if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= max) {
      onChange(parsedValue);
    }
  };


  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" border="1px solid #000" borderRadius="8px" padding="4px 8px" maxWidth="120px">
      <Button onClick={handleDecrement} disabled={value === 0} variant="text" sx={{ minWidth: "32px", padding: 0, borderRadius: "50%", fontSize: "1.2rem", color: value === 0 ? "#ccc" : "#000" }}>
        -
      </Button>
      <TextField
        value={value}
        onChange={handleInputChange}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          style: {
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: 500,
            appearance: "none",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
            margin: 0,
          },
        }}
        sx={{
          maxWidth: "50px",
          backgroundColor: "transparent",
          border: "none",
        }}
      />
      <Button onClick={handleIncrement} variant="text" sx={{ minWidth: "32px", padding: 0, borderRadius: "50%", fontSize: "1.2rem", color: "#000" }}>
        +
      </Button>
    </Box>
  );
};

export default function RecoveryTest({ recoveryData, setRecoveryData, onSectionComplete }) {
  const maxValues = {
    workoutRecovery: 120,
    relaxation: 600,
  };

  const [feedback, setFeedback] = useState(null);

  // Check if all required fields are filled
  const allFieldsCompleted =
    recoveryData.workoutRecovery > 0 &&
    recoveryData.relaxation > 0 &&
    recoveryData.sleepTime &&
    recoveryData.wakeTime;

  useEffect(() => {
    if (allFieldsCompleted) {
      onSectionComplete?.();
      generateFeedbackContent();
    }
    localStorage.setItem("recoveryData", JSON.stringify(recoveryData));
  }, [recoveryData, allFieldsCompleted, onSectionComplete]);

  const calculateSleepHours = (bed, wake) => {
    const bedTime = new Date(`2023-01-01T${bed}`);
    const wakeUpTime = new Date(`2023-01-01T${wake}`);
    let duration = (wakeUpTime - bedTime) / 3600000;
    if (duration < 0) duration += 24;
    return Math.round(duration);
  };

  const handleTimeChange = (field, value) => {
    setRecoveryData((prev) => {
      const newData = { ...prev, [field]: value };
      if (newData.sleepTime && newData.wakeTime) {
        newData.calculatedSleepHours = calculateSleepHours(newData.sleepTime, newData.wakeTime);
      }
      return newData;
    });
  };

  const handleCounterChange = (field, value) => {
    setRecoveryData((prev) => ({ ...prev, [field]: value }));
  };

  const generateFeedbackContent = () => {
    const feedback = [];

    // Sleep feedback
    if (recoveryData.calculatedSleepHours < 7) {
      feedback.push("You should try to sleep more. Aim for at least 7-8 hours of sleep per night.");
    } else if (recoveryData.calculatedSleepHours > 9) {
      feedback.push("You are sleeping a lot! Make sure that long sleep doesn’t leave you feeling sluggish.");
    } else {
      feedback.push("Your sleep duration is perfect. Keep maintaining 7-9 hours of sleep per night.");
    }

    // Workout recovery feedback
    if (recoveryData.workoutRecovery < 30) {
      feedback.push("Consider spending more time on workout recovery. 30-60 minutes of post-workout recovery is ideal.");
    } else {
      feedback.push("You are spending enough time on workout recovery. Great job!");
    }

    // Relaxation feedback
    if (recoveryData.relaxation < 30) {
      feedback.push("Try to spend at least 30 minutes a day on relaxation or meditation to reduce stress.");
    } else {
      feedback.push("Your relaxation time is sufficient. Keep it up to maintain good mental health!");
    }

    setFeedback(feedback.join("\n"));
  };

  const renderCounter = (label, field, value, max) => (
    <Grid item xs={12} key={field}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{label}</Typography>
        <CounterComponent value={value} onChange={(newValue) => handleCounterChange(field, newValue)} max={max} />
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Recovery Test
      </Typography>

      <Grid container spacing={4}>
        {/* Sleep Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Sleep</Typography>
          <Box Box display="flex" alignItems="center" gap={2} mt={1} justifyContent="flex-end">
            <TextField
              label="Bedtime"
              type="time"
              value={recoveryData.sleepTime}
              onChange={(e) => handleTimeChange("sleepTime", e.target.value)}
              sx={{ width: "120px" }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Wake Time"
              type="time"
              value={recoveryData.wakeTime}
              onChange={(e) => handleTimeChange("wakeTime", e.target.value)}
              sx={{ width: "120px" }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          {recoveryData.calculatedSleepHours && (
            <Typography mt={2} sx={{marginLeft:56}} textAlign="center">
              Sleep Time: <strong>{recoveryData.calculatedSleepHours} hours</strong>
            </Typography>
          )}
        </Grid>

        {/* Workout Recovery Section */}
        {renderCounter("Workout Recovery (in minutes)", "workoutRecovery", recoveryData.workoutRecovery, maxValues.workoutRecovery)}

        {/* Relaxation Section */}
        {renderCounter("Relaxation (in minutes)", "relaxation", recoveryData.relaxation, maxValues.relaxation)}
      </Grid>

      {/* Feedback Section */}
      {feedback && (
         <Box sx={{ mt: 3 }}>
         <Typography variant="h6">Your Recovery Report:</Typography>
         <TableContainer component={Paper} sx={{ marginTop: 2 }}>
           <Table sx={{ minWidth: 650 }} aria-label="Recovery Table">
             <TableBody>
               {/* Table header with S.No. and Feedback columns */}
               <TableRow>
                 <TableCell><strong>S.No.</strong></TableCell>
                 <TableCell><strong>Feedback</strong></TableCell>
               </TableRow>
     
               {/* Iterate over feedback lines */}
               {feedback.split("\n").map((line, index) => (
                 <TableRow key={index}>
                   <TableCell>{index + 1}</TableCell> {/* Serial number */}
                   <TableCell>{line}</TableCell> {/* Feedback content */}
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
       </Box>
      )}
    </Paper>
  );
}
