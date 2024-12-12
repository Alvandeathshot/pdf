import React, { useState, useEffect } from "react";
import { IconButton, Fab, TextField, Button, Paper, Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ChatIcon from "@mui/icons-material/Chat";
import CancelIcon from "@mui/icons-material/Cancel";

const App = () => {
  // States for GoToTopButton
  const [buttonState, setButtonState] = useState({ show: false, opacity: 0 });

  // States for ContactUs Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0);

  // Scroll event handler for GoToTopButton
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setButtonState({
      show: scrollY > 300 && !isFormOpen,  // Show only if form is not open
      opacity: Math.min(1, scrollY / 1000),
    });

    // Scroll event for ContactUs floating button
    setShowButton(scrollY > 500);
    setButtonOpacity(Math.min(1, scrollY / 1000));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    setIsFormOpen(false);
  };

  // Effect to track scroll and manage body overflow for form
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFormOpen]);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormOpen]);

  const styles = {
    goToTopButton: {
      position: "fixed",
      bottom: "50px",
      right: "50px",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: isFormOpen ? "not-allowed" : "pointer", // Disable the cursor when form is open
      display: buttonState.show ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      opacity: isFormOpen ? 0.5 : buttonState.opacity, // Reduce opacity when form is open
      transition: "opacity 0.3s ease, transform 0.3s ease",
      transform: buttonState.show ? "translateY(0)" : "translateY(20px)",
      zIndex: 1000,
      fontSize: "24px",
    },
    goToTopHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div>
      {/* Go to Top Button */}
      {buttonState.show && (
        <IconButton
          sx={styles.goToTopButton}
          onClick={isFormOpen ? null : scrollToTop}  // Disable click when form is open
          style={styles.goToTopButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.goToTopHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.goToTopButton.backgroundColor)}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}

      {/* Overlay for ContactUs Form */}
      {isFormOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={toggleForm}
        ></Box>
      )}

      {/* Floating Chat Button */}
      {showButton && (
        <Box
          sx={{
            position: "fixed",
            bottom: "130px",
            right: "20px",
            zIndex: 1000,
            animation: "slide-from-right 1s ease-out",
            "@keyframes slide-from-right": {
              "0%": { right: "-100px" },
              "100%": { right: "20px" },
            },
          }}
        >
          <Fab
            color="primary"
            aria-label="contact"
            onClick={toggleForm}
            sx={{
              marginBottom: isFormOpen ? "10px" : "0",
              width: "54px",
              height: "54px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            {isFormOpen ? <CancelIcon /> : <ChatIcon />}
          </Fab>

          {/* Inline Expandable Form */}
          {isFormOpen && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                bottom: "70px",
                right: "0",
                width: "300px",
                padding: "16px",
                borderRadius: "10px",
                zIndex: 1001,
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <Typography variant="h5" sx={{ marginBottom: "10px", textAlign: "center" }}>
                  Chat with us
                </Typography>
                <TextField id="name" label="Name" variant="outlined" fullWidth required />
                <TextField id="email" label="Email" type="email" variant="outlined" fullWidth required />
                <TextField id="message" label="Message" variant="outlined" multiline rows={4} fullWidth required />
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

export default App;
