import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Typography,
  Box,
  Link,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'; // Import from react-scroll
import { Facebook, Instagram, Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import logo from '../../assets/images/logo.svg';

// ==============================|| CUSTOM STYLED FOOTER ||============================== //

// Function to parse the content and replace **text** with <strong>text</strong> and && with <br />
const parseContentForBold = (content) => {
  const parts = content.split(/(\*\*.*?\*\*|&&)/g); // Split the string into parts by **text** and &&
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // If the part is bold text
      return (
        <strong key={index}>
          {part.replace(/\*\*/g, '')} {/* Remove the ** and wrap in <strong> */}
        </strong>
      );
    }
    if (part === '&&') {
      // If the part is the line break indicator
      return <br key={index} />;
    }
    return part; // Return the regular text
  });
};

const FooterBlock = ({ isFull }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const handleOpenDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogTitle('');
    setDialogContent('');
  };

  return (
    <div>
      {/* Footer Section */}
      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px 0' }}>
        <Container>
          <Grid container spacing={3} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  width: 320, // Set the width of the frame
                  height: 120,
                  overflow: 'hidden', // Ensure that the image doesn't overflow the frame
                  marginBottom: '10px', // Add some space below the image
                  marginLeft: '-35px'
                }}
              >
                <img
                  src={logo}
                  alt="DyadicHealth"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', // Ensure the logo fits within the frame without distortion
                    objectPosition: '-40% 50%', // Shift the image to the left
                  }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                2717 Western Blvd #402-D Raleigh NC 27606<br />
                +1 571 9347292
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h4">Company</Typography>

              <Box mt={2}>
                <Link
                  className="header-link"
                  color="secondary.main"
                  component={RouterLink}
                  to="/about-us"
                  underline="none"
                >
                  About Us
                </Link>
              </Box>

              <Box mt={2}>
                <Link
                  className="header-link"
                  color="secondary.main"
                  component={RouterLink}
                  to="/contact-us"
                  underline="none"
                >
                  Contact Us
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h4">Offerings</Typography>

              <Box mt={2}>
              <Link
              component="button"
              onClick={() => {

                const navigateToSectionWithOffset = () => {
                  const yOffset = -100; // Adjust the offset value as needed

                  const section = document.getElementById("technologies");
                  if (section) {
                    const yPosition = section.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: yPosition, behavior: "smooth" });
                  }
                };

                if (window.location.pathname === "/") {
                  // Same-page navigation
                  navigateToSectionWithOffset();
                } else {
                  // Cross-page navigation with offset
                  window.location.href = "/#technologies";

                  // Polling for the section until it exists in the DOM
                  const interval = setInterval(() => {
                    const section = document.getElementById("technologies");
                    if (section) {
                      navigateToSectionWithOffset();
                      clearInterval(interval); // Stop polling once the section is found
                    }
                  }, 100); // Check every 100ms
                }
              }}
              style={{ cursor: "pointer", color: "#5e6e7b", textDecoration: "none" }}
            >
              Pre-Assessment
            </Link>
            </Box>


              <Box mt={2}>
              <Tooltip title="Coming Soon" arrow
              PopperProps={{
                modifiers: [
                  {
                    name: 'arrow',
                    options: {
                      enabled: true,
                      placement: 'top', // This ensures the arrow points upwards
                    },
                  },
                ],
              }}
              >
                <Link
                className="header-link"
                color="secondary.main"
                component={RouterLink}
                underline="none"
                >Articles
                </Link>
              </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h4">Legal</Typography>

              <Box mt={2}>
                <Link
                  className="header-link"
                  color="secondary.main"
                  component="button"
                  onClick={() => handleOpenDialog('Legal Policy', `**1. No Medical Advice** &&
                      The information provided on this website, including text, graphics, images, and other material, is for informational purposes only. The Health Management System ("the Service") is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare providers with any questions you may have regarding a medical condition. && &&
                      **2. No Doctor-Patient Relationship** &&
                      Your use of the Service does not establish a doctor-patient relationship between you and any healthcare professional associated with the Service. Communications through the Service are not confidential and are not protected by doctor-patient privilege. && &&
                      **3. Use at Your Own Risk** &&
                      Your reliance on any information provided by the Service is solely at your own risk. We make no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content. && &&
                      **4. Limitation of Liability** &&
                      In no event shall we be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of the Service or for any other claim related in any way to your use of the Service. && &&
                      **5. No Guarantees** &&
                      We do not guarantee that the Service will meet your requirements or that it will be uninterrupted, timely, secure, or error-free. && &&
                      **6. Third-Party Links** &&
                      The Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. && &&
                      **7. Intellectual Property** &&
                      All content and materials on the Service are our intellectual property or the intellectual property of our licensors and are protected by applicable intellectual property laws. && &&
                      **8. Changes to This Disclaimer** &&
                      We reserve the right to modify this Disclaimer at any time. Any changes will be effective immediately upon posting on the website. && &&
                      **9. Governing Law** &&
                      This Disclaimer is governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions. && &&
                      **10. Contact Us** &&
                      If you have any questions about this Disclaimer, please contact us at`)}
                  underline="none"
                >
                  Legal Policy
                </Link>
              </Box>
              <Box mt={5}>
                <Link>
                     
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3} textAlign="center">
            <IconButton href="https://www.youtube.com/@dyadichealthofficial" aria-label="YouTube" target="_blank">
              <YouTube />
            </IconButton>
            <IconButton href="https://www.instagram.com/dyadichealth" aria-label="Instagram" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton href="https://www.facebook.com/DyadicHealth/" aria-label="Twitter" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton href="https://linkedin.com/company/dyadichealth" aria-label="LinkedIn" target="_blank">
              <LinkedIn />
            </IconButton>
          </Box>
        </Container>
      </footer>

      {/* Dialog for Terms & Conditions and Legal Policy */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {parseContentForBold(dialogContent)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FooterBlock.propTypes = {
  isFull: PropTypes.bool,
};

export default FooterBlock;