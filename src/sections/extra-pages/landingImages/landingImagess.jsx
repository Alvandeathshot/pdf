// import React, { useRef, useState, useEffect } from 'react';
// import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Grid from '@mui/material/Grid';
// import { Helmet } from 'react-helmet';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';


// // // Import local images
// // import img1 from 'assets/images/landingImages/ImaGes/pexels-olly-3768131.jpg';
// // import img2 from 'assets/images/landingImages/ImaGes/1-Dyadic home theam 2.jpg';
// // import img3 from 'assets/images/landingImages/ImaGes/pexels-ceekris-1756665.jpg';
// // import img4 from 'assets/images/landingImages/ImaGes/2.png';
// // import img5 from 'assets/images/landingImages/ImaGes/3.jpg';
// // import img6 from 'assets/images/landingImages/ImaGes/pexels-belle-co-99483-1000445.jpg';

// // Import local images
// import img1 from 'assets/images/landingImages/LandingImagess2/pexels-olly-3768131.jpg';
// import img2 from 'assets/images/landingImages/LandingImagess2/1-Dyadic home theam 2.jpg';
// import img3 from 'assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg';
// import img4 from 'assets/images/landingImages/LandingImagess2/2.png';
// import img5 from 'assets/images/landingImages/LandingImagess2/3.jpg';
// import img6 from 'assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg';

// const DyadicSlider = () => {
//     const slideRef = useRef(null);
//     const animationControls = useAnimation();

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const totalItems = 6;
//     const [selectedOption, setSelectedOption] = useState('');

//     // Automatically change slide every 3 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             handleNext();
//         }, 3000); // 3000 ms = 3 seconds

//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, [currentIndex]); // Depend on currentIndex to re-trigger on manual change

//     const handleNext = () => {
//         const items = slideRef.current.children;
//         slideRef.current.appendChild(items[0]);
//     };

//     const handlePrev = () => {
//         const items = slideRef.current.children;
//         slideRef.current.prepend(items[items.length - 1]);
//     };

//     const [ref, inView] = useInView({
//         triggerOnce: false, // Trigger animation each time it comes into view
//         threshold: 0.1 // Adjust the threshold for better control
//       });

//         useEffect(() => {
//     if (inView) {
//       animationControls.start({
//         opacity: 1,
//         translateY: 0,
//         transition: { type: 'spring', stiffness: 150, damping: 30 }
//       });
//     } else {
//       animationControls.start({ opacity: 0, translateY: 50 });
//     }
//   }, [inView, animationControls]);

//     // Scroll to section function
//     const scrollToSection = (sectionId) => {
//         const section = document.getElementById(sectionId);
//         if (section) {
//           section.scrollIntoView({ behavior: 'smooth' });
//         }
//       };
    
//       // Handle change for button clicks
//       const handleButtonClick = (sectionId) => {
//         setSelectedOption(sectionId);
//         scrollToSection(sectionId);
//       };


//     const items = [
//         {
//             title: 'Dyadic Relationship',
//             description: 'All Dyadic relationships have an interdependence. Targeted activities focus on interconnectedness.',
//             image: img1
//         },
//         {
//             title: 'Adventure Awaits',
//             description: 'Embark on a journey filled with thrill and excitement.',
//             image: img2
//         },
//         {
//             title: 'Urban Exploration',
//             description: 'Discover the hidden gems of the city.',
//             image: img3
//         },
//         {
//             title: 'Serene Nature',
//             description: 'Experience the calm and beauty of untouched nature.',
//             image: img4
//         },
//         {
//             title: 'Cultural Expedition',
//             description: 'Dive into the rich heritage and traditions.',
//             image: img5
//         },
//         {
//             title: 'Luxury Retreat',
//             description: 'Indulge in ultimate luxury and relaxation.',
//             image: img6
//         },
//     ];

//     return (
//       <Grid  container 
//             justifyContent="center" 
//             alignItems="center" 
//             sx={{ mt: 5, mb: 5 }}>
//                 <Helmet>
//                 <meta name="description" content="Discover the beauty of dyadic relationships through our captivating slider showcasing various themes." />
//                 <meta name="keywords" content="dyadic relationships, adventure, exploration, nature, culture" />
//                 <meta property="og:title" content="Explore Dyadic Relationships" />
//                 <meta property="og:description" content="Discover the beauty of dyadic relationships through our captivating slider showcasing various themes." />
//                 <meta property="og:image" content={img1} />
//                 <meta property="og:url" content="http://dyadichealth.com/" />
//                 <meta property="og:type" content="website" />
//                 <link rel="canonical" href="https://dyadichealth.com/" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <meta charSet="UTF-8" />
//                 </Helmet>
//               <Paper>
//               <Box
//               sx={{
//                 position: 'relative',
//                 width: '100%',
//                 height: { xs: '300px', sm: '400px', md: '500px' },  // Responsive height: smaller on mobile, larger on desktop
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 mt: { xs: '20px', sm: '40px', md: '50px' },        // Responsive margin-top for spacing
//                 mb: { xs: '20px', sm: '40px', md: '50px' },        // Responsive margin-bottom
//                 }}
//             >

//         <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: {
//                 xs: '90vw',  // extra small devices (0px and up)
//                 sm: '80vw',  // small devices (600px and up)
//                 md: '80vw',  // medium devices (900px and up)
//                 lg: '90vw',  // large devices (1200px and up)
//                 xl: '1400px', // extra-large devices (1536px and up)
//               },
//               height: { xs: '400px', md: '600px' },
//               background: '#f5f5f5',
//               boxShadow: '0 30px 50px #dbdbdb',
//               overflow: 'hidden',
//               borderRadius:'20px'
//             }}
//         >
//             <Box ref={slideRef} className="slide" sx={{ position: 'relative', height: '100%' }}>
//                 {items.map((item, index) => (
//                     <Box
//                         key={index}
//                         className="item"
//                         sx={{
//                             width: { xs: '150px', sm: '180px', md: '180px' }, // Responsive width
//                             height: { xs: '250px', sm: '280px', md: '250px' }, // Responsive height
//                             position: 'absolute',
//                             top: '50%',
//                             transform: 'translate(0, -50%)',
//                             borderRadius: '20px',
//                             boxShadow: '0 30px 50px #505050',
//                             backgroundImage: `url(${item.image})`,
//                             backgroundPosition: '50% 50%',
//                             backgroundSize: 'cover',
//                             transition: '0.5s',
//                             left: {
//                                 xs: `${index * 100}px`, // Adjust positioning for small screens
//                                 sm: `${index * 130}px`, // Adjust for small to medium screens
//                                 md: `${index < 3 ? index * 220 + 50 : 660}px`, // Original logic for larger screens
//                             },
//                             opacity: index < 6 ? 1 : 0,
//                         }}
//                         >
//                             <Box
//                             className="content"
//                             sx={{
//                                 position: 'absolute',
//                                 top: '50%',
//                                 left: { xs: '20px', sm: '50px', md: '100px' }, // Responsive left position
//                                 width: { xs: '80%', sm: '250px', md: '300px' }, // Responsive width
//                                 textAlign: 'left',
//                                 color: '#eee',
//                                 transform: 'translate(0, -50%)',
//                                 display: index === 1 ? 'block' : 'none',
//                             }}
//                             >
//                                 <Typography
//                                 sx={{
//                                     fontSize: { xs: '18px', sm: '20px', md: '25px' }, // Responsive font size
//                                     fontFamily: '"Montserrat", sans-serif',
//                                     textTransform: 'uppercase',
//                                     fontWeight: 'bold',
//                                     opacity: 0,
//                                     animation: 'animate 1s ease-in-out 1 forwards',
//                                     textShadow: '5px 5px 20px rgba(0, 0, 0, 0.9)',
//                                     color: 'white'
//                                 }}
//                                 >
//                                     {item.title}
//                                 </Typography>
//                                 <Typography
//                                     className="des"
//                                     sx={{
//                                         fontSize: { xs: '12px', sm: '14px', md: '15px' }, // Responsive font size
//                                         marginTop: '10px',
//                                         marginBottom: '20px',
//                                         opacity: 0,
//                                         color: 'white',
//                                         fontFamily: 'Poppins, sans-serif',
//                                         animation: 'animate 1s ease-in-out 0.3s 1 forwards',
//                                         textShadow: `
//                                         1px 1px 2px rgba(0, 0, 0, 0.8),
//                                         2px 2px 4px rgba(0, 0, 0, 0.7),
//                                         3px 3px 6px rgba(0, 0, 0, 0.6),
//                                         4px 4px 8px rgba(0, 0, 0, 0.5)`,
//                                     }}
//                                 >
//                                     {item.description}
//                                 </Typography>
//                                 {/* <Button
//                                     sx={{
//                                         opacity: 0,
//                                         padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
//                                         border: 'none',
//                                         background: 'white',
//                                         color: 'blue',
//                                         animation: 'animate 1s ease-in-out 0.6s 1 forwards',
//                                         fontSize: { xs: '12px', sm: '14px' } // Responsive font size
//                                     }}
//                                 >
//                                     See More
//                                 </Button> */}
//                                 <Box
//             sx={{
//                 opacity: 0,
//                 ml:-4.5,
//                 textAlign: 'center',
//                 gap: 2,
//                 animation: 'animate 1s ease-in-out 0.3s 1 forwards',
//             }}
//         >
//                 <Button
//                     sx={{
//                         margin: '0 5px',
//                         backgroundColor: 'white', // Always white background
//                         color: selectedOption === 'combo' ? 'blue' : 'black', // Change text color on select
//                         borderColor: selectedOption === 'combo' ? 'blue' : 'black', // Change border color on select
//                         '&:hover': {
//                             backgroundColor: 'blue', // Background color changes to blue on hover
//                             color: 'white', // Text color changes to white on hover
//                             borderColor: 'blue', // Border color changes to blue on hover
//                         },
//                     }}
//                     variant="outlined"
//                     onClick={() => handleButtonClick('combo')}
//                 >
//                     Explore Further
//                 </Button>
//                 <Button
//                     sx={{
//                         margin: '0 5px',
//                         backgroundColor: 'white', // Always white background
//                         color: selectedOption === 'technologies' ? 'blue' : 'black', // Change text color on select
//                         borderColor: selectedOption === 'technologies' ? 'blue' : 'black', // Change border color on select
//                         '&:hover': {
//                             backgroundColor: 'blue', // Background color changes to blue on hover
//                             color: 'white', // Text color changes to white on hover
//                             borderColor: 'blue', // Border color changes to blue on hover
//                         },
//                     }}
//                     variant="outlined"
//                     onClick={() => handleButtonClick('technologies')}
//                 >
//                     Start Training
//                 </Button>
//         </Box>
//                             </Box>
//                         </Box>
//                     ))}
//                     </Box>
//             <Box
//             sx={{
//                 position: 'absolute',
//                 bottom: '20px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 textAlign: 'center',
//                 zIndex: 10, // Ensure buttons are on top
//                 gap: 2,
//             }}
//         >
//             <motion.div
//                 initial={{ opacity: 0, translateY: 50 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: 0.4 }}
//             >
//                 <Button
//                     sx={{
//                         margin: '0 10px',
//                         backgroundColor: 'white', // Always white background
//                         color: selectedOption === 'combo' ? 'blue' : 'black', // Change text color on select
//                         borderColor: selectedOption === 'combo' ? 'blue' : 'black', // Change border color on select
//                         '&:hover': {
//                             backgroundColor: 'blue', // Background color changes to blue on hover
//                             color: 'white', // Text color changes to white on hover
//                             borderColor: 'blue', // Border color changes to blue on hover
//                         },
//                     }}
//                     variant="outlined"
//                     onClick={() => handleButtonClick('combo')}
//                 >
//                     Explore Further
//                 </Button>
//                 <Button
//                     sx={{
//                         margin: '0 10px',
//                         backgroundColor: 'white', // Always white background
//                         color: selectedOption === 'technologies' ? 'blue' : 'black', // Change text color on select
//                         borderColor: selectedOption === 'technologies' ? 'blue' : 'black', // Change border color on select
//                         '&:hover': {
//                             backgroundColor: 'blue', // Background color changes to blue on hover
//                             color: 'white', // Text color changes to white on hover
//                             borderColor: 'blue', // Border color changes to blue on hover
//                         },
//                     }}
//                     variant="outlined"
//                     onClick={() => handleButtonClick('technologies')}
//                 >
//                     Start Training
//                 </Button>
//             </motion.div>
//         </Box>

//              {/* Button Container */}
//              <Box sx={{ width: '100%', textAlign: 'center', position: 'absolute',
//                         bottom: { xs: '10px', sm: '20px' }, // Responsive bottom position
//                         padding: { xs: '0 10px', sm: '0' }, // Padding for small devices
//               }}>
//                         <IconButton
//                             onClick={handlePrev}
//                             sx={{
//                                 width: { xs: '30px', sm: '40px' }, // Responsive width
//                                 height: { xs: '25px', sm: '35px' }, // Responsive height
//                                 borderRadius: '8px',
//                                 border: '1px solid #000',
//                                 margin: '0 5px',                                 
//                                 color: 'blue',
//                                 right: { 
//                                     xs: '20%',    // 5% from the right for extra small devices
//                                     sm: '25%',   // 10% from the right for small devices
//                                     md: '20%',   // 15% from the right for medium devices
//                                     lg: '25%',   // 20% from the right for large devices
//                                     xl: '500px', // Fixed distance for extra-large devices (1536px and up)
//                                 },
//                             }}
//                         >
//                             <ArrowBackIosIcon />
//                         </IconButton>
//                         <IconButton
//                             onClick={handleNext}
//                             sx={{
//                                 width: { xs: '30px', sm: '40px' }, // Responsive width
//                                 height: { xs: '25px', sm: '35px' }, // Responsive height
//                                 borderRadius: '8px',
//                                 border: '1px solid #000',
//                                 margin: '0 5px',
//                                 color: 'blue',
//                                 left: {
//                                     xs: '20%',    // 5% from the right for extra small devices
//                                     sm: '25%',   // 10% from the right for small devices
//                                     md: '20%',   // 15% from the right for medium devices
//                                     lg: '25%',   // 20% from the right for large devices
//                                     xl: '500px', // Fixed distance for extra-large devices (1536px and up)                                  
//                                 },
//                             }}
//                         >
//                             <ArrowForwardIosIcon />
//                         </IconButton>
//                   </Box>
//             <style>{`
//                 * {
//                     margin: 0;
//                     padding: 0;
//                     box-sizing: border-box;
//                 }
//                 body {
//                     background: #eaeaea;
//                 }
//                 .slide .item {
//                     display: inline-block;
//                 }
//                 .slide .item:nth-child(1),
//                 .slide .item:nth-child(2) {
//                     top: 0;
//                     left: 0;
//                     transform: translate(0, 0);
//                     border-radius: 0;
//                     width: 100%;
//                     height: 100%;
//                 }
//                 .slide .item:nth-child(3) {
//                     left: 50%;
//                 }
//                 .slide .item:nth-child(4) {
//                     left: calc(50% + 220px);
//                 }
//                 .slide .item:nth-child(5) {
//                     left: calc(50% + 440px);
//                 }
//                 .slide .item:nth-child(n + 6) {
//                     left: calc(50% + 660px);
//                     opacity: 0;
//                 }
//                 @keyframes animate {
//                     from {
//                         opacity: 0;
//                         transform: translate(0, 100px);
//                         filter: blur(33px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translate(0);
//                         filter: blur(0);
//                     }
//                 }
//                 .content {
//                     display: none;
//                 }
//                 .slide .item:nth-child(2) .content {
//                     display: block;
//                 }
//             `}</style>
//             </Box>
//         </Box>
//         </Paper>
//         </Grid>
//     );
// };

// export default DyadicSlider;








import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// // Import local images
// import img1 from 'assets/images/landingImages/LandingImagess2/pexels-olly-3768131.jpg';
// import img2 from 'assets/images/landingImages/LandingImagess2/1-Dyadic home theam 2.jpg';
// import img3 from 'assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg';
// import img4 from 'assets/images/landingImages/LandingImagess2/2.png';
// import img5 from 'assets/images/landingImages/LandingImagess2/3.jpg';
// import img6 from 'assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg';

const DyadicSlider = () => {
    const slideRef = useRef(null);
    const animationControls = useAnimation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = 6;
    const [selectedOption, setSelectedOption] = useState('');

    // Automatically change slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // 3000 ms = 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]); // Depend on currentIndex to re-trigger on manual change

    const handleNext = () => {
        const items = slideRef.current.children;
        slideRef.current.appendChild(items[0]);
    };

    const items = [
        {
            title: 'Dyadic Relationship',
            description: 'All Dyadic relationships have an interdependence. Targeted activities focus on interconnectedness.',
            image: img1
        },
        {
            title: 'Adventure Awaits',
            description: 'Embark on a journey filled with thrill and excitement.',
            image: img2
        },
        {
            title: 'Urban Exploration',
            description: 'Discover the hidden gems of the city.',
            image: img3
        },
        {
            title: 'Serene Nature',
            description: 'Experience the calm and beauty of untouched nature.',
            image: img4
        },
        {
            title: 'Cultural Expedition',
            description: 'Dive into the rich heritage and traditions.',
            image: img5
        },
        {
            title: 'Luxury Retreat',
            description: 'Indulge in ultimate luxury and relaxation.',
            image: img6
        },
    ];

    return (
      <Grid  container 
            justifyContent="center" 
            alignItems="center" >
                <Helmet>
                <meta name="description" content="Discover the beauty of dyadic relationships through our captivating slider showcasing various themes." />
                <meta name="keywords" content="dyadic relationships, adventure, exploration, nature, culture" />
                <meta property="og:title" content="Explore Dyadic Relationships" />
                <meta property="og:description" content="Discover the beauty of dyadic relationships through our captivating slider showcasing various themes." />
                <meta property="og:image" content={img1} />
                <meta property="og:url" content="http://dyadichealth.com/" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://dyadichealth.com/" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                </Helmet>
              <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },  // Responsive height: smaller on mobile, larger on desktop
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: { xs: '20px', sm: '40px', md: '50px' },        // Responsive margin-top for spacing
                mb: { xs: '20px', sm: '40px', md: '50px' },        // Responsive margin-bottom
                }}
            >

        <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '90vw',  // extra small devices (0px and up)
                sm: '80vw',  // small devices (600px and up)
                md: '50vw',  // medium devices (900px and up)
                lg: '60vw',  // large devices (1200px and up)
                xl: '1012px', // extra-large devices (1536px and up)
              },
              height: {
                xs: '300px',  // Extra-small devices (e.g., phones)
                sm: '350px',  // Small devices (e.g., small tablets)
                md: '390px',  // Medium devices (e.g., tablets)
                lg: '400px',  // Large devices (e.g., laptops)
                xl: '600px',  // Extra-large devices (e.g., large desktops)
            },
              background: '#f5f5f5',
              boxShadow: '0 30px 50px #dbdbdb',
              overflow: 'hidden',
              borderRadius:'10px'
            }}
        >
            <Box ref={slideRef} className="slide" sx={{ position: 'relative', height: '100%' }}>
                {items.map((item, index) => (
                    <Box
                        key={index}
                        className="item"
                        sx={{
                            width: { xs: '0px', sm: '0px', md: '0px' }, // Responsive width
                            height: { xs: '0px', sm: '0px', md: '0px' }, // Responsive height
                            position: 'absolute',
                            top: '50%',
                            transform: 'translate(0, -50%)',
                            borderRadius: '20px',
                            boxShadow: '0 30px 50px #505050',
                            backgroundImage: `url(${item.image})`,
                            backgroundPosition: '50% 50%',
                            backgroundSize: 'cover',
                            transition: '0.5s',
                            left: {
                                xs: `${index * 100}px`, // Adjust positioning for small screens
                                sm: `${index * 130}px`, // Adjust for small to medium screens
                                md: `${index < 3 ? index * 220 + 50 : 660}px`, // Original logic for larger screens
                            },
                            opacity: index < 6 ? 1 : 0,
                        }}
                        >
                        </Box>
                    ))}
                    </Box>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    background: #eaeaea;
                }
                .slide .item {
                    display: inline-block;
                }
                .slide .item:nth-child(1),
                .slide .item:nth-child(2) {
                    top: 0;
                    left: 0;
                    transform: translate(0, 0);
                    border-radius: 0;
                    width: 100%;
                    height: 100%;
                }
                .slide .item:nth-child(3) {
                    left: 50%;
                }
                .slide .item:nth-child(4) {
                    left: calc(50% + 220px);
                }
                .slide .item:nth-child(5) {
                    left: calc(50% + 440px);
                }
                .slide .item:nth-child(n + 6) {
                    left: calc(50% + 660px);
                    opacity: 0;
                }
                @keyframes animate {
                    from {
                        opacity: 0;
                        transform: translate(0, 100px);
                        filter: blur(33px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(0);
                        filter: blur(0);
                    }
                }
                .content {
                    display: none;
                }
                .slide .item:nth-child(2) .content {
                    display: block;
                }
            `}</style>
            </Box>
        </Box>
        </Grid>
    );
};

export default DyadicSlider;
