import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BreathingExercise from './bmicalculator.jsx'; // Adjust the path as per your structure

export default function BmiPart() {
  const [bmiData, setBmiData] = useState(null); // Store BMI data (height, weight, bmi)
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  // Callback when BMI is calculated in BreathingExercise
  const handleBmiCalculation = (data) => {
    setBmiData(data); // Store the BMI data (height, weight, bmi)
    setError(null); // Clear previous error
  };

  return (
    <>
      {/* BreathingExercise component is responsible for calculating BMI */}
      <BreathingExercise onGenerateReport={handleBmiCalculation} />

      {/* Show error if there's an issue */}
      {error && (
        <Typography align="center" color="error" sx={{ mt: 3 }}>
          {error}
        </Typography>
      )}

      {/* Show report if it exists */}
      {report && (
        <Box sx={{ mt: 3 }}>
          <Typography align="center" color="text.secondary">
            You must complete all 6 steps to get your report.
          </Typography>
          <Box display="flex" justifyContent="flex-end" width="100%" key="next-button-box">
            <Button variant="contained" onClick={() => (window.location.href = '/Foundation')}>
              Next
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}




 // for JAVA
  // Function to generate the report when the user clicks "Generate Report"
  // const generateReport = async () => {
  //   if (bmiData?.bmi) {
  //     setLoading(true);
  //     setError(null);
  
  //     try {
  //       const response = await fetch('http://localhost:8080/api/bmi', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ height: bmiData.height, weight: bmiData.weight }),
  //       });
  
  //       const data = await response.json();
  
  //       if (response.ok) {
  //         setReport({
  //           bmi: data.bmi,
  //           message: data.message,
  //         });
  //         setReportGenerated(true); // Show that the report is generated
  //         setError(null); // Clear error on success
  //       } else {
  //         setError(data.error || 'An error occurred while generating the report.');
  //       }
  //     } catch (error) {
  //       console.error('Error generating report:', error);
  //       setError('An error occurred while contacting the server.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     setError('Please calculate BMI first.');
  //   }
  // };