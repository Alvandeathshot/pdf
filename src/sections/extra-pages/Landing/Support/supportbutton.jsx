import React, { useState, useEffect } from "react";
import { Fab, TextField, Button, Paper, Box, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat"; // New icon for chat
import CancelIcon from "@mui/icons-material/Cancel"; // Close icon

const ContactUs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0); // Add state for opacity

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    setIsFormOpen(false);
  };

  // Track scroll position to show the button when scrolled down 300px
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setShowButton(true);
        setButtonOpacity(Math.min(1, scrollY / 1000)); // Adjust opacity
      } else {
        setShowButton(false);
        setButtonOpacity(0); // Reset opacity
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable background scrolling when form is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset on component unmount
    };
  }, [isFormOpen]);

  return (
    <div>
      {/* Overlay (dulls background when form is open) */}
      {isFormOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
            zIndex: 999, // Behind the form
          }}
          onClick={toggleForm} // Close the form when the overlay is clicked
        ></Box>
      )}

      {showButton && (
        <Box sx={{ position: "fixed", bottom: "130px", right: "20px", zIndex: 1000,
          animation: "slide-from-right 1s ease-out", // Apply animation for sliding effect 
          "@keyframes slide-from-right": {
              "0%": { right: "-100px" }, // Start off-screen to the right
              "100%": { right: "20px" }, // End at the normal position
            },
        }}>
          {/* Floating Chat Button */}
          <Fab
            color="primary"
            aria-label="contact"
            onClick={toggleForm}
            sx={{
              marginBottom: isFormOpen ? "10px" : "0",
              width: "54px", // Adjust width and height to your needs
              height: "54px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)", // Optional: custom shadow
            }}
          >
            {isFormOpen ? <CancelIcon /> : <ChatIcon />} {/* Use Chat Icon */}
          </Fab>

          {/* Inline Expandable Form */}
          {isFormOpen && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                bottom: "70px", // Above the button
                right: "0",
                width: "300px",
                padding: "16px",
                borderRadius: "10px",
                zIndex: 1001, // Above the overlay
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <Typography
                  variant="h5"
                  sx={{ marginBottom: "10px", textAlign: "center" }}
                >
                  Chat with us
                </Typography>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  id="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </form>
            </Paper>
          )}
        </Box>
      )}
    </div>
  );
};

export default ContactUs;
