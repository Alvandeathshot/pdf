import React, { useEffect, useState } from "react";
import { Button, Box, TextField, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

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

const DietTest = ({ onSectionComplete }) => {
  const initialDietData = JSON.parse(localStorage.getItem("dietData")) || {
    veggies: 0,
    protein: 0,
    grains: 0,
    nutsSeeds: 0,
    dairy: 0,
    fruits: 0,
  };
  const [dietData, setDietData] = useState(initialDietData);
  const [recommendation, setRecommendation] = useState("");
  const [reportFetched, setReportFetched] = useState(false);

  // Retrieve individual data points from localStorage or use initial values
  // const [dietData, setDietData] = useState(() => {
  //   const savedData = {
  //     veggies: Number(localStorage.getItem("veggies")) || 0,
  //     protein: Number(localStorage.getItem("protein")) || 0,
  //     grains: Number(localStorage.getItem("grains")) || 0,
  //     nutsSeeds: Number(localStorage.getItem("nutsSeeds")) || 0,
  //     dairy: Number(localStorage.getItem("dairy")) || 0,
  //     fruits: Number(localStorage.getItem("fruits")) || 0,
  //     recommendation: localStorage.getItem("dietRecommendation") || "",
  //   };
  //   return savedData;
  // });

  // const [recommendation, setRecommendation] = useState(dietData.recommendation || "");
  // const [reportFetched, setReportFetched] = useState(false);

  const maxValues = {
    veggies: 12,
    protein: 10,
    grains: 8,
    nutsSeeds: 5,
    dairy: 6,
    fruits: 12,
  };
  // Validate all counters are filled
  const allCountersFilled = Object.keys(maxValues).every((key) => Number(dietData[key]) > 0);


  // Automatically fetch the report when all counters are filled
  useEffect(() => {
    if (allCountersFilled && !reportFetched) {
      setReportFetched(true);
      onSectionComplete?.();
      fetchReport();
    }
  }, [allCountersFilled, reportFetched, onSectionComplete]);

  // Save each individual data point to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dietData", JSON.stringify(dietData));
  }, [dietData]);

  const handleCounterChange = (field, value) => {
    setDietData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchReport = async () => {
    try {
      const response = await axios.post(
        "https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/diet",
        dietData
      );
      setRecommendation(response.data); // Store the recommendation
    } catch (error) {
      console.error("Error fetching report:", error);
      alert("Failed to fetch the report. Please try again later.");
    }
  };

  const renderCounter = (label, field, value, max) => (
    <Grid item xs={12} sm={6} key={field} container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      <Grid item xs={6}>
        <CounterComponent value={value} onChange={(newValue) => handleCounterChange(field, newValue)} max={max} />
      </Grid>
    </Grid>
  );

  const hasConsumptionData = ["veggies", "protein", "grains", "nutsSeeds", "dairy", "fruits"]
    .some((key) => Number(dietData[key]) > 0);

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Diet Test
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please provide servings for the following food groups:
      </Typography>

      {/* Counter Section */}
      <Grid container spacing={2}>
        {Object.keys(maxValues).map((field) =>
          renderCounter(
            field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1"), // Format label
            field,
            dietData[field],
            maxValues[field]
          )
        )}
      </Grid>

      {/* Display Selected Items */}
{hasConsumptionData && (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" gutterBottom>
      Your Consumption:
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Food Group</strong></TableCell>
            <TableCell align="center"><strong>Servings</strong></TableCell>
            <TableCell align="center"><strong>Food Group</strong></TableCell>
            <TableCell align="center"><strong>Servings</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(maxValues).slice(0, 3).map((field, index) => {
            const formattedLabel = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1");
            const secondField = Object.keys(maxValues).slice(3)[index] || '';
            const secondFormattedLabel = secondField.charAt(0).toUpperCase() + secondField.slice(1).replace(/([A-Z])/g, " $1");

            return (
              <TableRow key={field}>
                <TableCell>{formattedLabel}</TableCell>
                <TableCell align="center">{dietData[field]}</TableCell>
                <TableCell sx={{ borderLeft: '1px solid #ccc' }}>{secondFormattedLabel}</TableCell>
                <TableCell align="center">{dietData[secondField]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)}




      {/* Message to Proceed */}
      {allCountersFilled ? (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" color="primary">
            You can now go to the next section.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" color="textSecondary">
            Fill all boxes to proceed.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default DietTest;
