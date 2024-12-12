import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Tooltip, Typography, Box } from "@mui/material";

const HowItWorks = ({ closePopup }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  const handleMouseEnter = (text, event) => {
    const { clientX, clientY } = event;
    setTooltip({ visible: true, text, x: clientX, y: clientY });
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setTooltip((prev) => ({ ...prev, x: clientX, y: clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: "", x: 0, y: 0 });
  };

  const handleSectionNavigation = (sectionId) => {
    const yOffset = -100; // Adjust this value to control the offset (e.g., -50px above the section title)
  
    if (location.pathname === "/") {
      // If already on the same page
      const section = document.getElementById(sectionId);
      if (section) {
        const yPosition = section.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    } else {
      // Navigate to the page and scroll to the section after loading
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const yPosition = section.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: yPosition, behavior: "smooth" });
        }
      }, 500); // Adjust timeout to allow page loading
    }
  
    if (typeof closePopup === "function") {
      closePopup();
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0ebe3", padding: "1px", borderRadius: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      "@media (max-width: 768px)": {
        height: '50vh',
        padding: "5px",  // Adjust padding for mobile
        },
     }}>
      {tooltip.visible && (
        <Box
          sx={{
            position: "fixed",
            backgroundColor: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            zIndex: 1000,
            pointerEvents: "none",
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
            "@media (max-width: 768px)": {
              height: '50vh',
              padding: "5px",  // Adjust padding for mobile
            },
          }}
        >
          {tooltip.text}
        </Box>
      )}

      <Box sx={{ textAlign: "center", margin: 0 }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          HOW IT WORKS
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px", maxWidth: "100%" }}>
          {/* Row 1 */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "1px",
            "@media (max-width: 768px)": {
              width: '10vw',
            },
           }}>
            <Tooltip title="Discover new features and services" placement="top">
              <Button
                sx={{
                  backgroundColor: "#e2befe",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                  "@media (max-width: 768px)": {
                    width: "2vw", // Full width on smaller screens
                    
                  },
                }}
                onClick={() => handleSectionNavigation()}
              >
                EXPLORE
              </Button>
            </Tooltip>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#333", margin: "0 10px" }}>→</Typography>
            <Tooltip title="Learn more about our offerings" placement="top">
              <Button
                sx={{
                  backgroundColor: "#bdd4fe",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleSectionNavigation("cards")}
              >
                KNOW SERVICES/FEATURES
              </Button>
            </Tooltip>
          </Box>

          {/* Downward Arrow on Right Side */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "29%" }}>
            <Typography style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>↓</Typography>
          </Box>

          {/* Row 2 */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "1px" }}>
            <Tooltip title="Please complete PRE-ASSESSMENT first" placement="top">
              <Button
                sx={{
                  backgroundColor: "#c0ffca",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigation()}
              >
                ENTER YOUR EMAIL ID
              </Button>
            </Tooltip>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#333", margin: "0 10px" }}>←</Typography>
            <Tooltip title="Take a quick pre-assessment" placement="top">
              <Button
                sx={{
                  backgroundColor: "#ffedbe",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleSectionNavigation("technologies")}
              >
                PRE-ASSESSMENT
              </Button>
            </Tooltip>
          </Box>

          {/* Downward Arrow on Left Side */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "29%" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>↓</Typography>
          </Box>

          {/* Row 3 */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "1px" }}>
            <Tooltip title="Please complete PRE-ASSESSMENT first" placement="top">
              <Button
                sx={{
                  backgroundColor: "#febebe",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigation()}
              >
                LOGIN TO DASHBOARD
              </Button>
            </Tooltip>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#333", margin: "0 10px" }}>→</Typography>
            <Tooltip title="Please complete PRE-ASSESSMENT first" placement="top">
              <Button
                sx={{
                  backgroundColor: "#ffde5b",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigation()}
              >
                ACCESS REPORT & ARTICLES
              </Button>
            </Tooltip>
          </Box>

          {/* Downward Arrow on Right Side */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "29%" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>↓</Typography>
          </Box>

          {/* Row 4 */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "1px" }}>
            <Tooltip title="Please complete PRE-ASSESSMENT first" placement="top">
              <Button
                sx={{
                  background: "linear-gradient(to right, #cafbdb, #98c0fe)",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigation()}
              >
                ACCESS COURSEWORK
              </Button>
            </Tooltip>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#333", margin: "0 10px" }}>←</Typography>
            <Tooltip title="Please complete PRE-ASSESSMENT first" placement="top">
              <Button
                sx={{
                  backgroundColor: "#FFE0B2",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  width: "220px",
                  minWidth: "180px",
                  boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.1)",
                  border: "3px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigation()}
              >
                REGISTER FOR COURSEWORK
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;
