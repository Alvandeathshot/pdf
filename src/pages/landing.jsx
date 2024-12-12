import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider
import { Link as RouterLink } from 'react-router-dom'; // Import Link for internal navigation
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  Typography, Container, Box, CircularProgress, Button,
  IconButton, Tooltip, Modal, Slider
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMediaQuery } from '@mui/material';



// project-imports
import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/extra-pages/video/videosection';
import Apps from 'sections/landing/Apps';
import Free from 'sections/landing/Free';
import Articles from './Articles';
import Images from '../sections/extra-pages/landingImages/landingImagess' 
import ArticlesDisplay from 'sections/extra-pages/AritclesIdea2/AritclesDisplay';
import Hero2 from 'sections/extra-pages/LandingIdea2/Hero2';
import Hero3 from 'sections/extra-pages/landingImages/images';
import TabSection from 'sections/extra-pages/Landing/TabSection/Tabs';
import Exercise from 'src/sections/extra-pages/preassessment/exercise.jsx';
import ExploreCards from 'sections/extra-pages/Landing/section3/ThreeSection';
import SupportButton from 'sections/extra-pages/Landing/Support/supportbutton';
import GotoTopandSupport from 'sections/extra-pages/Landing/Buttons/gototopandsupport';
import MobileAssessment from 'sections/extra-pages/preassessment/mobileAssessment';

export default function Landing() {
  // const [view, setView] = useState('articles'); // Set 'articles' as the default view
  // const [videoEnabled, setVideoEnabled] = useState(false); // Initially, video button is locked
  const [showButton, setShowButton] = useState(false); // State to show or hide the "Go to Top" button
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)'); // Detect device

  const handleToggle = (selectedView) => {
    if (view !== selectedView) {
      setView(selectedView);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 300) {
      setShowButton(true);
      setButtonOpacity(Math.min(1, scrollY / 1000));
    } else {
      setShowButton(false);
      setButtonOpacity(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const styles = {
    sectionContainer: {
      padding: '20px', // Add some padding around the section content
      backgroundColor: '#ffffff', // Set the background color to white
      borderRadius: '10px', // Optional: Add border radius for a rounded container
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Optional: Add a shadow for better visual separation
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px', // Add margin on top to separate buttons from the content above
    },
    button: {
      position: 'relative', // Set position to relative for lock icon placement
      padding: '10px 20px',
      borderRadius: '5px',
      border: '1px solid #007bff', // Optional: Add border to match the button color
      cursor: 'pointer',
      backgroundColor: '#f2f2f2', // Set the button background color to white
      color: '#007bff', // Change the text color to match the primary theme color
      fontSize: '16px',
      transition: 'background-color 0.3s ease, opacity 0.3s ease', // Smooth transition for opacity
      opacity: 0.8, // Add initial opacity to buttons
      '&:hover': {
        opacity: 1, // Increase opacity on hover for enabled buttons
      },
      display: 'flex', // Use flex to align text and icon
      alignItems: 'center', // Center-align text and icon vertically
      gap: '5px', // Small gap between text and icon
    },
    buttonDisabled: {
      backgroundColor: '#e0e0e0', // Set a grey background color to indicate disabled state
      color: '#6c757d',
      cursor: 'not-allowed', // Show disabled cursor
      opacity: 0.6, // Lower opacity for disabled buttons to emphasize the disabled state
    },
    lockIcon: {
      fontSize: '16px', // Adjust the size of the lock icon
      color: '#6c757d', // Color of the lock icon
    },
    goToTopButton: {
      position: 'fixed',
      bottom: '50px',
      right: '50px',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      display: showButton ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: buttonOpacity,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      transform: showButton ? 'translateY(0)' : 'translateY(20px)',
      zIndex: 1000,
      fontSize: '24px', // Default icon size for desktop
    },
    goToTopHover: {
      backgroundColor: '#0056b3',
    },
    // Media query for responsiveness
    '@media (max-width: 768px)': {
      goToTopButton: {
        bottom: '30px', // Adjust the position for smaller screens
        right: '30px',
        padding: '8px', // Reduce padding
        fontSize: '20px', // Reduce icon size for smaller screens
      },
    },
    '@media (max-width: 480px)': {
      goToTopButton: {
        bottom: '20px', // Adjust the position further for very small screens
        right: '20px',
        padding: '6px', // Further reduce padding for mobile
        fontSize: '18px', // Smallest icon size for mobile
      },
    },
  };

  

  return (
    <HelmetProvider>
      <React.Fragment>
        {/* Dynamic SEO using Helmet */}
        <Helmet>
          <title>Dyadic Health | Home</title>
          <meta property="og:title" content="Dyadic Health | Comprehensive Relationship Wellness Assessments & Resources" />
          <meta name="description" content="Explore Dyadic Health for comprehensive assessments, articles, and resources on emotional and physical well-being in relationships." />
          <meta name="keywords" content="dyadic health, relationship wellness, emotional well-being, physical assessments, articles, videos, health resources" />
          <meta property="og:image" content="https://dyadichealth.com/assets/logo-Cw2pFXVB.svg" />
          <meta property="og:url" content="https://dyadichealth.com/" />
          <meta property="og:type" content="website" />
          {/* Viewport meta tag for mobile responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
        </Helmet>

        {/* <Hero /> */}

        <section id="Hero">
        <Hero2 />
        </section>

        {/* <section id="test">
        <Hero3 />
        </section> */}
        
        {/* <section id="tabs">
        <TabSection />
        </section> */}

        <section id="cards">
          <ExploreCards />
        </section>


        {/* <Hero5 /> */}
        {/* <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "0 20px", // Add padding to prevent overflow on smaller screens
        boxSizing: "border-box", // Ensure padding is included in the total width/height
      }}
    >
      <Hero4 />
    </div> */}
        
        {/* <Grid item xs={12}>
        <section id="Images">
          <Images />
        </section>
        </Grid> */}
        
        {/* <section id="combo" style={styles.sectionContainer}>
          {view === 'articles' ? <Articles /> : <Combo />}
          <div style={styles.buttonContainer}>
            <button
            onClick={() => handleToggle('articles')}
            disabled={view === 'articles'}
            style={{
              ...styles.button,
              ...(view === 'articles' && styles.buttonDisabled),
            }}
            >
              Articles
            </button>

            <button
            onClick={() => handleToggle('combo')}
            disabled={view === 'combo'}
            style={{
              ...styles.button,
              ...(view === 'combo' && styles.buttonDisabled),
            }}
            >
              Videos
            </button>
          </div>
        </section> */}


        {/* <section id="technologies">
          <Exercise/>
        </section> */}


        <section id="technologies">
          {isMobile ? <MobileAssessment /> : <Exercise />}
        </section>

        <section id="articlesdisplay">
          <ArticlesDisplay />
        </section>

      
        {/* <section id="combo">
        <Combo isSection={true} />
        </section>
        <Apps />
       
        {/* <Apps /> */}

        {/* <section id="support">
          <SupportButton />
        </section> */}


        <section id="newsletter">
          <Free />
        </section>


        <section id="support">
          <GotoTopandSupport />
        </section>
        
        
        {/* Go to Top Button with Font Awesome Icon */}
        {/* <IconButton sx={{position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: '#fff', ':hover': { bgcolor: 'primary.dark'} }}
          onClick={scrollToTop}
          style={styles.goToTopButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.goToTopHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.goToTopButton.backgroundColor}
        >
          <ArrowUpwardIcon />
          </IconButton> */}
      </React.Fragment>
    </HelmetProvider>
  );
}