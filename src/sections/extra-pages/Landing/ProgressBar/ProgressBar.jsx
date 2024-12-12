import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Pending from 'assets/images/icons/pending-icon-26.jpg';


// const colors = [
//   "#2196f3", // Orange
//   "#ffffff", 
//   "#ffffff", 
//   "#ffffff", 
//   "#ffffff", 
//   "#ffffff",
// ];

const VerticalProgressBar = ({ steps = [] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Ensure elements are stacked vertically
        maxWidth: "240px", // Adjust the width as necessary
        height: "100%", // Ensure it fills the container
        alignItems: "flex-start", // Align vertically
        mt:'48px',
      }}
    >
      {/* Vertical Line */}
      <Box
        sx={{
          position: "relative",
          marginRight: "16px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            height: "48vh",
            backgroundColor: "#e0e0e0",
          }}
        />
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginBottom: index < steps.length - 1 ? "62px" : 0,
              "@media (max-width: 768px)": {
              marginBottom: index < steps.length - 1 ? "42px" : 0,
              },
            }}
          >
            {/* Step Status */}
            {step.completed ? (
              <CheckCircleIcon
                sx={{
                  color: "#4caf50", // Green color for completed steps
                  fontSize: "30px",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "2px solid #2196f3",
                  backgroundColor: '#ffffff',
                  // backgroundColor: colors[index % colors.length], // Default color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Pending} // Update path here
                  alt="Pending"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </Box>
            )}

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "28px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "4px",
                  height: "65px",
                  backgroundColor: step.completed ? "#4caf50" : "#e0e0e0",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VerticalProgressBar;
