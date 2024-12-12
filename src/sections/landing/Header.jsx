import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Typewriter } from "react-simple-typewriter";

import Cards from 'sections/extra-pages/Landing/Cards/cards';
import Images from 'sections/extra-pages/landingImages/landingImagess';

// ==============================|| LANDING - HeaderPage ||============================== //

export default function HeaderPage() {
  const theme = useTheme();
  const animationControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const textLines = [
    "Dyadic Relationships",
    "Spousal Relationships",
    "Parental Relationships",
    "Other Dyads"
  ];
  
  // Dynamic typing speed (can be changed based on interaction)
  const typingSpeed = 75; // Typing speed (ms per character)
  const deletionSpeed = 100; // Deletion speed (ms per character)

  const [currentTypingSpeed, setCurrentTypingSpeed] = useState(typingSpeed); // Dynamic typing speed

  // Handle dynamic typing speed (for example, when user interacts with a button)
  const changeTypingSpeed = (speed) => {
    setCurrentTypingSpeed(speed);
  };

  // Typewriter effect logic
  useEffect(() => {
    const currentLine = textLines[textIndex];
    let timer;

    if (isDeleting) {
      // Deleting the text
      timer = setTimeout(() => {
        setText((prevText) => prevText.slice(0, -1));
        if (text === '') {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % textLines.length);
        }
      }, deletionSpeed); // Control speed of text deletion
    } else {
      // Typing the text
      timer = setTimeout(() => {
        setText((prevText) => currentLine.slice(0, prevText.length + 1));
        if (text === currentLine) {
          // After full text is typed, wait before starting deletion
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000); // Adjust the delay here (in ms) as needed
        }
      }, currentTypingSpeed); // Control speed of typing
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, textIndex, textLines, currentTypingSpeed]); // Add currentTypingSpeed to dependencies

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = (sectionId) => {
    setSelectedOption(sectionId);
    scrollToSection(sectionId);
  };

  useEffect(() => {
    if (inView) {
      animationControls.start({
        opacity: 1,
        translateY: 0,
        transition: { type: 'spring', stiffness: 150, damping: 30 }
      });
    } else {
      animationControls.start({ opacity: 0, translateY: 50 });
    }
  }, [inView, animationControls]);


  return (
    <Box
      sx={{
        height: { sm: '60vh', md: '70vh',lg: '70vh', xl: '70vh' }, // Exact height for medium and larger screens, auto for smaller
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECEDF3',
        flexDirection: { md: 'row' },
        padding: { sm: '40px', md: '40px',lg: '40px', xl: '40px' },
        '@media (max-width: 768px)': {
          height: '90vh', // Adjust for smaller screens
          flexDirection: 'column',
          padding: '10px',
        },
      }}
    >
      <Container>
        <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ pt: { md: 0, xs: 5 }, pb: { md: 0, xs: 10 } }}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Grid container spacing={3} sx={{ textAlign: 'center' }}>
              <Grid item xs={12}>
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={animationControls}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        xs: '24px',
                        sm: '28px',
                        md: '30px',
                        lg: '38px',
                        xl: '27px',
                      },
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    Improve Your 
                    <Typography variant="h1"
                    sx={{
                      fontSize: {
                        xs: '24px',
                        sm: '28px',
                        md: '30px',
                        lg: '38px',
                        xl: '27px',
                      },
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}>
                      Relationships' Health
                      </Typography>
                    {' '}with 
                    <Typography
                      variant="h1"
                      component="span"
                      sx={{
                        fontSize: '30px',
                        background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                        color: 'transparent',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        ml: 1,
                        animation: 'move-bg 24s infinite linear',
                        '@keyframes move-bg': { '100%': { backgroundPosition: '400% 0' } }
                      }}
                    >
                      <Typography
                        component="sup"
                        sx={{
                          fontSize: '0.4em',
                          verticalAlign: 'super',
                          color: '#2491f2',
                        }}
                      >
                      "
                      </Typography>
                      Dyadic Health
                      <Typography
                        component="sup"
                        sx={{
                          fontSize: '0.4em',
                          verticalAlign: 'super',
                          color: '#2491f2',
                        }}
                      >
                      "
                      </Typography>
                    </Typography>
                  </Typography>
                </motion.div>
              </Grid>
              <Grid container justifyContent="center" item xs={12}>
                <Grid item xs={8}>
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, translateY: 50 }}
                    animate={animationControls}
                    transition={{ delay: 0.2 }}
                  >
                    <Box sx={{
                     display: "inline-flex", // Automatically sizes to text content
                      justifyContent: 'center', // Center content horizontally
                      alignItems: 'center', // Center content vertically
                      height: '6vh', // Full viewport height
                      // width:'100%',
                      backgroundColor: '#fff0e2', // Background color
                      borderRadius: '10px', // Rounded corners
                      boxSizing: 'border-box', // Include padding in width/height calculations
                      marginTop: -2,
                      marginBottom: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      width: `${text.length * 1.2 + 4}ch`, // Adjust multiplier to fit your font size
                      '@media (max-width: 768px)': {
                        width: `${text.length * 1.2}ch`, // Adjust multiplier to fit your font size
                      },
                      }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: {
                          xs: '0.875rem', md: '1.4rem'
                        },
                        fontFamily: '"Roboto Slab", sans-serif', // Apply Roboto Slab font globally
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                        fontWeight: 500,
                        lineHeight: { xs: 1.4, md: 1.4 },
                        width: '100%',
                        textAlign: 'center',
                        display: 'inline',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        position: 'relative',
                        color:'purple',
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                    >
                      {text}
                      {/* Blinking cursor */}
                      <Box
                        component="span"
                        sx={{
                          left: `${text.length}ch`, // Cursor moves with text
                          display: 'inline-block',
                          width: '2px', // Adjust width for the cursor
                          height: '1.0em', // Adjust height dynamically based on font size
                          backgroundColor: '#000',
                          animation: 'blink 0.7s steps(2) infinite',
                          
                        }}
                      />
                      <style>
                        {`
                          @keyframes blink {
                            0%, 50% { opacity: 1; }
                            50.1%, 100% { opacity: 0; }
                          }
                        `}
                      </style>
                    </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={animationControls}
                  transition={{ delay: 0.4 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 2, 
                    mt: 2, 
                    }}>
                    <Button
                      variant={selectedOption === 'cards' ? 'contained' : 'contained'}
                      onClick={() => handleButtonClick('cards')}
                      sx={{
                        '@media (max-width: 768px)': {
                          mt:'-20px',
                          padding: '5px 5px', // Smaller padding for mobile
                          fontSize: '0.875rem', // Smaller font size
                          minWidth: '110px', // Narrower button
                          height: '4vh'
                        },
                      }}
                    >
                      Explore Further
                    </Button>
                    <Button
                      variant={selectedOption === 'technologies' ? 'contained' : 'contained'}
                      onClick={() => handleButtonClick('technologies')}
                      sx={{
                        '@media (max-width: 768px)': {
                          mt:'-20px',
                          padding: '5px 5px', // Smaller padding for mobile
                          fontSize: '0.875rem', // Smaller font size
                          minWidth: '110px', // Narrower button
                          height: '4vh'
                        },
                      }}
                    >
                      Start Training
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Section: 60% */}
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <motion.div
                  ref={ref}
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={animationControls}
                >
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: { sm: "0 20px", md: "0 40px" }, // Adjusting padding based on screen size
              marginLeft: {
                xs: 0,   // No margin on small screens
                sm: -6,  // Small negative margin for medium screens
                md: -6,  // Maintain margin for medium screens
                lg: 10,  // Increase margin for larger screens
                xl: 40   // Larger margin on extra-large screens
              },
              "@media (max-width: 768px)": {
                flexDirection: 'column',
                height: '40vh', // Adjust for smaller screens
                mt:'2px'
              }
            }}>
              <Cards currentTextIndex={textIndex} />
            </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}