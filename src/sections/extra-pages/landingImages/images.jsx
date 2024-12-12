// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Grid } from '@mui/material';
// import Paper from '@mui/material/Paper';
// // import image1 from 'assets/images/landingImages/LandingImagess2/pexels-olly-3768131.jpg';
// // import image2 from 'assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg';
// // import image3 from 'assets/images/landingImages/LandingImagess2/pexels-jopwell-2422294.jpg';
// // import image4 from 'assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg';
// // import image5 from 'assets/images/landingImages/LandingImagess2/pexels-fauxels-3184183.jpg';

// const CaseStudySection = () => {
//   const imageContainerRef = useRef(null);
//   const sectionRef = useRef(null);
//   const [scrollDisabled, setScrollDisabled] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const images = [image1, image2, image3, image4, image5];
//   const brandNames = ["Dyadic Relationship", "Adventure Awaits", "Urban Exploration", "Serene Nature", "Luxury Retreat"];
//   const descriptions = [
//     "All Dyadic relationships have an interdependence. Targeted activities focus on interconnectedness.",
//     "Embark on a journey filled with thrill and excitement.",
//     "Discover the hidden gems of the city.",
//     "Experience the calm and beauty of untouched nature.",
//     "Indulge in ultimate luxury and relaxation."
//   ];

//   const slowScrollStep = 40; // Scroll step in pixels (slower scroll effect)
//   let scrollTimeout = useRef(null); // To hold the timeout for scroll effect

//   const handleScroll = (e) => {
//     const container = imageContainerRef.current;
//     const containerScrollTop = container.scrollTop;
//     const containerHeight = container.clientHeight;
//     const scrollHeight = container.scrollHeight;

//     const newIndex = Math.min(
//       images.length - 1,
//       Math.floor((containerScrollTop / (scrollHeight - containerHeight)) * images.length)
//     );
//     setCurrentIndex(newIndex);

//     // Slow down the scroll by using a smaller increment and controlling it with setTimeout
//     if (e.deltaY > 0) {
//       // Scrolling down
//       if (containerScrollTop + containerHeight >= scrollHeight) {
//         setIsFullScreen(false); // Exit full screen when reaching the bottom
//         setScrollDisabled(false);
//       } else {
//         setScrollDisabled(true);
//         // Slow scroll down (move by a smaller amount)
//         clearTimeout(scrollTimeout.current);
//         scrollTimeout.current = setTimeout(() => {
//           container.scrollTop += slowScrollStep;
//         }, 15); // Adjust timeout to control the scroll speed
//       }
//     } else {
//       // Scrolling up
//       if (containerScrollTop === 0) {
//         setIsFullScreen(false); // Exit full screen when reaching the top
//         setScrollDisabled(false);
//       } else {
//         setScrollDisabled(true);
//         // Slow scroll up (move by a smaller amount)
//         clearTimeout(scrollTimeout.current);
//         scrollTimeout.current = setTimeout(() => {
//           container.scrollTop -= slowScrollStep;
//         }, 15); // Adjust timeout to control the scroll speed
//       }
//     }

//     if (scrollDisabled) {
//       e.preventDefault();
//     }
//   };

//   useEffect(() => {
//     const sectionElement = sectionRef.current;
//     const handleWheel = (e) => {
//       if (sectionElement && sectionElement.contains(e.target)) {
//         setIsFullScreen(true); // Enter full-screen when scroll starts
//         handleScroll(e);
//       }
//     };

//     window.addEventListener('wheel', handleWheel, { passive: false });
//     return () => {
//       window.removeEventListener('wheel', handleWheel, { passive: false });
//       clearTimeout(scrollTimeout.current); // Cleanup the timeout on component unmount
//     };
//   }, [scrollDisabled]);

//   return (
//     <Box
//       sx={{
//         ...styles.container,
//         ...(isFullScreen && styles.fullScreen),
//       }}
//       ref={sectionRef}
//     >
//       <Grid container spacing={4} alignItems="center" justifyContent="center">
//         <Grid item xs={12} md={6}>
//           <Box sx={styles.textContainer}>
//             <Typography variant="h4" sx={styles.brandName}>
//               {brandNames[currentIndex]}
//             </Typography>
//             <Typography variant="body1" sx={styles.description}>
//               {descriptions[currentIndex]}
//             </Typography>
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={6} sx={styles.imageContainer}>
//           <Box sx={styles.scrollableImageContainer} ref={imageContainerRef}>
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             {/* <Box sx={styles.card}>
//               <Typography variant="h4" sx={styles.cardTitle}>
//               {brandNames[currentIndex]}
//               </Typography>
//               <Typography variant="body1" sx={styles.cardDescription}>
//               {descriptions[currentIndex]}
//               </Typography>
//             </Box> */}
//             </Paper>

//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Image ${index + 1}`}
//                 style={{
//                   ...styles.image,
//                   opacity: currentIndex === index ? 1 : 0.5,
//                 }}
//               />
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: '#ECEDF3',
//     color: '#fff',
//     padding: '20px',
//     height: '70vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden', // Keep this to avoid the outer section overflowing
//     position: 'relative',
//     transition: 'all 0.3s ease',
//   },
//   fullScreen: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     zIndex: 1000,
//   },
//   textContainer: {
//     color: '#000',
//     paddingRight: '20px',
//     margin: '100px',
//     animation: 'animate 1s ease-in-out 0.3s 1 forwards',
//   },
//   brandName: {
//     fontSize: '36px',
//     margin: '10px 0',
//   },
//   description: {
//     fontSize: '18px',
//     margin: '10px 0 20px 0',
//   },
//   imageContainer: {
//     maxWidth: '100%',
//     height: '500px',
//     position: 'relative',
//     overflow: 'visible', // Allow overflow for the card
//   },
//   scrollableImageContainer: {
//     height: '100%',
//     width: '100%',
//     overflowY: 'scroll',
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: '5px',
//     scrollbarWidth: 'thin',
//     scrollbarColor: '#0070f3 #ffffff',
//   },
//   card: {
//     position: 'absolute',
//     top: '30%', // Center the card vertically
//     left: '-40%', // 80% of the card will be outside the image on the left
//     width: '60%', // Ensure the card is wider than the container (enough to overflow 80%)
//     height: '45%',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     padding: '20px',
//     borderRadius: '10px',
//     zIndex: 10,
//     boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.2)', // Adding shadow effect
//   },
//   cardTitle: {
//     color: 'black',
//     fontSize: '25px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   },
//   cardDescription: {
//     color: 'black',
//     fontSize: '20px',
//   },
//   image: {
//     width: '100%',
//     height: '500px',
//     objectFit: 'cover',
//     borderRadius: '20px',
//     marginBottom: '20px',
//     transition: 'opacity 0.5s ease',
//   },
// };

// export default CaseStudySection;



import React from 'react';
import { useMediaQuery, Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MyResponsiveSection = () => {
  const isMobile = useMediaQuery('(max-width:768px)'); // Mobile breakpoint

  return (
    <Box>
      {isMobile ? (
        // Mobile View: Section with Buttons
        <Box
          sx={{
            backgroundColor: '#f0f8ff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Mobile Section
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#007bff',
              color: '#fff',
              marginBottom: '10px',
              width: '100%',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            Button 1
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#28a745',
              color: '#fff',
              marginBottom: '10px',
              width: '100%',
              '&:hover': { backgroundColor: '#218838' },
            }}
          >
            Button 2
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffc107',
              color: '#000',
              width: '100%',
              '&:hover': { backgroundColor: '#e0a800' },
            }}
          >
            Button 3
          </Button>
        </Box>
      ) : (
        // Desktop View: Table
        <Box
          sx={{
            backgroundColor: '#d3f9d8',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
            Desktop Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Column 1</b></TableCell>
                  <TableCell><b>Column 2</b></TableCell>
                  <TableCell><b>Column 3</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Row 1 Data 1</TableCell>
                  <TableCell>Row 1 Data 2</TableCell>
                  <TableCell>Row 1 Data 3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Row 2 Data 1</TableCell>
                  <TableCell>Row 2 Data 2</TableCell>
                  <TableCell>Row 2 Data 3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Row 3 Data 1</TableCell>
                  <TableCell>Row 3 Data 2</TableCell>
                  <TableCell>Row 3 Data 3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default MyResponsiveSection;
