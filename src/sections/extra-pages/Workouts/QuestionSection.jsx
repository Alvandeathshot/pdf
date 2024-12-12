import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

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

  const handleBlur = () => {
    if (value < 0) onChange(0);
    if (value > max) onChange(max);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid #000"
      borderRadius="8px"
      padding="4px 8px"
      maxWidth="120px"
    >
      <Button
        onClick={handleDecrement}
        disabled={value === 0}
        variant="text"
        sx={{
          minWidth: "32px",
          padding: 0,
          borderRadius: "50%",
          fontSize: "1rem",
          color: value === 0 ? "#ccc" : "#000",
        }}
      >
        -
      </Button>
      <TextField
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
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
          },
          max,
        }}
        sx={{ maxWidth: "50px", mx: 1 }}
      />
      <Button
        onClick={handleIncrement}
        disabled={value === max}
        variant="text"
        sx={{
          minWidth: "32px",
          padding: 0,
          borderRadius: "50%",
          fontSize: "1rem",
          color: value === max ? "#ccc" : "#000",
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default function WorkoutTest({ onSectionComplete }) {
  const initialWorkoutData = JSON.parse(localStorage.getItem("workoutData")) || {
    cardio: 0,
    stretching: 0,
    resistance: 0,
  };
  // Initialize workout data with 0 values
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);

  const maxValues = {
    cardio: 200,
    stretching: 200,
    resistance: 200,
  };

  const allCountersFilled = Object.values(workoutData).every((value) => value > 0);

  useEffect(() => {
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
    if (allCountersFilled) {
      onSectionComplete?.();
    }
  }, [workoutData, allCountersFilled, onSectionComplete]);

  const handleCounterChange = (field, value) => {
    setWorkoutData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Workout Test
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please provide your workout details:
      </Typography>

      <Grid container spacing={4}>
        {Object.keys(maxValues).map((field) => (
          <Grid item xs={12} key={field}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">
                {field.charAt(0).toUpperCase() + field.slice(1)} (min per week)
              </Typography>
              <CounterComponent
                value={workoutData[field]}
                onChange={(value) => handleCounterChange(field, value)}
                max={maxValues[field]}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {allCountersFilled && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Your Workout:</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="workout table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Activity</TableCell>
                  <TableCell align="center">Minutes per Week</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(workoutData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell align="center">{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                    <TableCell align="center">{value} minutes</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {allCountersFilled ? (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" color="primary">
            You can now go to the next section.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" color="textSecondary">
            Fill all counters to proceed.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
