// import React, { useState } from 'react';
// import { Tab, Tabs, Box, Typography } from '@mui/material';
// import { motion } from 'framer-motion';

// // Import images
// import tabImage1 from 'assets/images/landingImages/LandingImagess2/pexels-jopwell-2422294.jpg';
// import tabImage2 from 'assets/images/landingImages/LandingImagess2/pexels-fauxels-3184183.jpg';
// import tabImage3 from 'assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg';
// import tabImage4 from 'assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg';
// import tabImage5 from 'assets/images/landingImages/LandingImagess2/3.jpg';

// const TabSection = () => {
//   const [value, setValue] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', padding: { xs: '20px', sm: '30px' }, backgroundColor: '#f4f6f8' }}>
//       {/* Title */}
//       <Typography
//         variant="h4"
//         sx={{
//           marginBottom: { xs: '20px', sm: '30px', md: '50px' },
//           color: '#37474f',
//           textAlign: 'center',
//           fontWeight: 'bold',
//           fontSize: {
//             xs: '24px',
//             sm: '28px',
//             md: '32px',
//             lg: '36px',
//             xl: '30px',
//           },
//         }}
//       >
//         Know More About Dyadic Health
//       </Typography>

//       {/* Tabs Section */}
//       <Tabs
//         value={value}
//         onChange={handleTabChange}
//         indicatorColor="primary"
//         textColor="primary"
//         variant="fullWidth"
//         aria-label="tabs"
//         sx={{
//           mb: 2, // Removed margin between tabs and content
//           borderBottom: 'none', // Removed border between tabs
//           backgroundColor: '#0288d1', // Tab background color
//         }}
//       >
//         {/* Tab 1 */}
//         <Tab
//           label={
//             <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', borderRight: '1px solid #ddd', marginRight: '4px' }}>
//               <img
//                 src={tabImage1}
//                 alt="Tab 1"
//                 style={{
//                   width: '100%',
//                   height: '120px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   transition: 'transform 0.3s ease',
//                 }}
//               />
//             </Box>
//           }
//           sx={{
//             '&:hover img': {
//               transform: 'scale(1.1)',
//             },
//             '&.Mui-selected': {
//               backgroundColor: '#fff', // White background for selected tab
//               color: '#0288d1', // Change text color to match active tab
//               borderBottom: '4px solid #0288d1', // Bottom border for selected tab
//             },
//           }}
//         />
//         {/* Tab 2 */}
//         <Tab
//           label={
//             <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', borderRight: '1px solid #ddd', marginRight: '4px' }}>
//               <img
//                 src={tabImage2}
//                 alt="Tab 2"
//                 style={{
//                   width: '100%',
//                   height: '120px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   transition: 'transform 0.3s ease',
//                 }}
//               />
//             </Box>
//           }
//           sx={{
//             '&:hover img': {
//               transform: 'scale(1.1)',
//             },
//             '&.Mui-selected': {
//               backgroundColor: '#fff', // White background for selected tab
//               color: '#0288d1',
//               borderBottom: '4px solid #0288d1',
//             },
//           }}
//         />
//         {/* Tab 3 */}
//         <Tab
//           label={
//             <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', borderRight: '1px solid #ddd', marginRight: '4px' }}>
//               <img
//                 src={tabImage3}
//                 alt="Tab 3"
//                 style={{
//                   width: '100%',
//                   height: '120px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   transition: 'transform 0.3s ease',
//                 }}
//               />
//             </Box>
//           }
//           sx={{
//             '&:hover img': {
//               transform: 'scale(1.1)',
//             },
//             '&.Mui-selected': {
//               backgroundColor: '#fff', // White background for selected tab
//               color: '#0288d1',
//               borderBottom: '4px solid #0288d1',
//             },
//           }}
//         />
//         {/* Tab 4 */}
//         <Tab
//           label={
//             <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', borderRight: '1px solid #ddd', marginRight: '4px' }}>
//               <img
//                 src={tabImage4}
//                 alt="Tab 4"
//                 style={{
//                   width: '100%',
//                   height: '120px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   transition: 'transform 0.3s ease',
//                 }}
//               />
//             </Box>
//           }
//           sx={{
//             '&:hover img': {
//               transform: 'scale(1.1)',
//             },
//             '&.Mui-selected': {
//               backgroundColor: '#fff', // White background for selected tab
//               color: '#0288d1',
//               borderBottom: '4px solid #0288d1',
//             },
//           }}
//         />
//         {/* Tab 5 */}
//         <Tab
//           label={
//             <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
//               <img
//                 src={tabImage5}
//                 alt="Tab 5"
//                 style={{
//                   width: '100%',
//                   height: '120px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   transition: 'transform 0.3s ease',
//                 }}
//               />
//             </Box>
//           }
//           sx={{
//             '&:hover img': {
//               transform: 'scale(1.1)',
//             },
//             '&.Mui-selected': {
//               backgroundColor: '#fff', // White background for selected tab
//               color: '#0288d1',
//               borderBottom: '4px solid #0288d1',
//             },
//           }}
//         />
//       </Tabs>

//       {/* Content Section with Slide Transition */}
//       <Box
//         sx={{
//           position: 'relative',
//           height: '300px',
//           overflow: 'hidden',
//           backgroundColor: '#fff',
//           borderRadius: '10px',
//           border: '1px solid #ddd',
//           boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//         }}
//       >
//         <motion.div
//           key={value}
//           initial={{ x: '100%' }} // Slide in from the right
//           animate={{ x: 0 }} // Move to the center
//           exit={{ x: '-100%' }} // Slide out to the left
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           style={{ position: 'absolute', width: '100%', height: '100%' }}
//         >
//           {value === 0 && 
//           <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
//           <Typography variant="body1">
//             Tab 1 Content: Dyadic health is about the relationship between individuals and their shared health.
//             This concept focuses on how the interactions and support between two individuals can improve their health outcomes.
//           </Typography>
//           </Box>}

//           {value === 1 && 
//           <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
//           <Typography variant="body1">
//             Tab 2 Content: Dyadic health approaches are vital for improving mental and emotional well-being. Collaborative health
//             strategies offer mutual benefits for both partners in a relationship.
//           </Typography>
//           </Box>}

//           {value === 2 && 
//           <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
//           <Typography variant="body1">
//             Tab 3 Content: Successful dyadic health interventions include shared fitness goals and emotional support. Health professionals
//             can guide couples towards holistic well-being.
//           </Typography>
//           </Box>}

//           {value === 3 && 
//           <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
//           <Typography variant="body1">
//             Tab 4 Content: This tab explores the role of communication in dyadic health. Effective communication helps in fostering healthier relationships.
//           </Typography>
//           </Box>}

//           {value === 4 && 
//           <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
//           <Typography variant="body1">
//             Tab 5 Content: Dyadic health isn't just physical; it also involves emotional and social well-being. It’s about building resilience
//             as a pair through various challenges.
//           </Typography>
//           </Box>}
//         </motion.div>
//       </Box>
//     </Box>
//   );
// };

// export default TabSection;



import React, { useState } from 'react';
import { Tab, Tabs, Box, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence  } from 'framer-motion';

// // Import images
// import tabImage1 from 'assets/images/landingImages/LandingImagess2/pexels-jopwell-2422294.jpg';
// import tabImage2 from 'assets/images/landingImages/LandingImagess2/pexels-fauxels-3184183.jpg';
// import tabImage3 from 'assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg';
// import tabImage4 from 'assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg';
// import tabImage5 from 'assets/images/landingImages/LandingImagess2/3.jpg';

const TabSection = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
    <Box sx={{ width: '100%', padding: { xs: '20px', sm: '30px' }, backgroundColor: '#f4f6f8' }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: { xs: '20px', sm: '30px', md: '50px' },
          color: '#37474f',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px', xl: '30px' },
        }}
      >
        Know More About Dyadic Health
      </Typography>

      {/* Tabs Section */}
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="tabs"
        sx={{
          // mb: 1,
          borderBottom: 'none',
          backgroundColor: 'black',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          
        }}
      >
        {/* Tab 1 */}
        <Tab
          label={
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', marginRight: '4px' }}>
              <img
                src={tabImage1}
                alt="Tab 1"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            </Box>
          }
          sx={{
            backgroundColor: value === 0 ? '#ffffff' : '#f0f0f0',
            opacity: value === 0 ? 2 : 0.6,
            color: value === 0 ? '#0288d1' : 'inherit',
            '&:hover img': {
              transform: 'scale(1.1)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#0288d1',
              borderBottom: '2px solid #0288d1',
            },
          }}
        />
        <Box sx={{ borderRight: '2px solid #ddd' }} />
        {/* Tab 2 */}
        <Tab
          label={
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center',  marginRight: '4px' }}>
              <img
                src={tabImage2}
                alt="Tab 2"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            </Box>
          }
          sx={{
            backgroundColor: value === 2 ? '#ffffff' : '#f0f0f0',
            opacity: value === 2 ? 2 : 0.6,
            color: value === 2 ? '#0288d1' : 'inherit',
            '&:hover img': {
              transform: 'scale(1.1)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#0288d1',
              borderBottom: '2px solid #0288d1',
            },
          }}
        />
        <Box sx={{ borderRight: '2px solid #ddd' }} />
        {/* Tab 3 */}
        <Tab
          label={
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center',  marginRight: '4px' }}>
              <img
                src={tabImage3}
                alt="Tab 3"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            </Box>
          }
          sx={{
            backgroundColor: value === 4 ? '#ffffff' : '#f0f0f0',
            opacity: value === 4 ? 2 : 0.6,
            color: value === 4 ? '#0288d1' : 'inherit',
            '&:hover img': {
              transform: 'scale(1.1)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#0288d1',
              borderBottom: '2px solid #0288d1',
            },
          }}
        />
        <Box sx={{ borderRight: '2px solid #ddd' }} />
        {/* Tab 4 */}
        <Tab
          label={
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center',  marginRight: '4px' }}>
              <img
                src={tabImage4}
                alt="Tab 4"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            </Box>
          }
          sx={{
            backgroundColor: value === 6 ? '#ffffff' : '#f0f0f0',
            opacity: value === 6 ? 2 : 0.6,
            color: value === 6 ? '#0288d1' : 'inherit',
            '&:hover img': {
              transform: 'scale(1.1)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#0288d1',
              borderBottom: '2px solid #0288d1',
            },
          }}
        />
        <Box sx={{ borderRight: '2px solid #ddd' }} />
        {/* Tab 5 */}
        <Tab
          label={
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img
                src={tabImage5}
                alt="Tab 5"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            </Box>
          }
          sx={{
            backgroundColor: value === 8 ? '#ffffff' : '#f0f0f0',
            opacity: value === 8 ? 2 : 0.6,
            color: value === 8 ? '#0288d1' : 'inherit',
            '&:hover img': {
              transform: 'scale(1.1)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#0288d1',
              borderBottom: '2px solid #0288d1',
            },
          }}
        />
      </Tabs>

      {/* Content Section with Slide Transition */}
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <AnimatePresence>
   <motion.div
      key={value}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
   >
          {value === 0 && 
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, height: '100%', justifyContent: 'center' }}>
          <Typography variant="h5" gutterBottom color="primary">
          Dyadic Health Concept
          </Typography>
          <Typography variant="body1">
          Dyadic health is about the relationship between individuals and their shared health. This concept focuses on how the interactions and support between two individuals can improve their health outcomes.
          </Typography>
          </Box>
          }

          {value === 2 && 
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, height: '100%', justifyContent: 'center' }}>
          <Typography variant="h5" gutterBottom color="primary">
          Mental and Emotional Well-being
          </Typography>
          <Typography variant="body1">
          Dyadic health approaches are vital for improving mental and emotional well-being. Collaborative health strategies offer mutual benefits for both partners in a relationship.
          </Typography>
          </Box>
          }

          {value === 4 && 
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, height: '100%', justifyContent: 'center' }}>
          <Typography variant="h5" gutterBottom color="primary">
          Shared Fitness Goals
          </Typography>
          <Typography variant="body1">
          Successful dyadic health interventions include shared fitness goals and emotional support. Health professionals can guide couples towards holistic well-being.
          </Typography>
        </Box>
          }

          {value === 6 && 
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, height: '100%', justifyContent: 'center' }}>
          <Typography variant="h5" gutterBottom color="primary">
          Communication in Dyadic Health
          </Typography>
          <Typography variant="body1">
          Effective communication helps in fostering healthier relationships and plays a significant role in dyadic health outcomes.
          </Typography>
        </Box>
          }
        
          {value === 8 && 
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, height: '100%', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom color="primary">
              Emotional and Social Well-being
            </Typography>
            <Typography variant="body1">
              Dyadic health isn’t just physical; it also involves emotional and social well-being. It’s about building resilience as a pair through various challenges.
            </Typography>
          </Box>
          }
        </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
    </Paper>
  );
};

export default TabSection;






// import React, { useState } from 'react';
// import { Tab, Tabs, Box, Typography, Paper } from '@mui/material';
// import { motion, AnimatePresence } from 'framer-motion';

// // Import images
// import tabImage1 from 'assets/images/landingImages/LandingImagess2/pexels-jopwell-2422294.jpg';
// import tabImage2 from 'assets/images/landingImages/LandingImagess2/pexels-fauxels-3184183.jpg';
// import tabImage3 from 'assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg';
// import tabImage4 from 'assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg';
// import tabImage5 from 'assets/images/landingImages/LandingImagess2/3.jpg';

// const TabSection = () => {
//   const [value, setValue] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const tabData = [
//     {
//       image: tabImage1,
//       title: 'Dyadic Health Concept',
//       content: 'Dyadic health is about the relationship between individuals and their shared health. This concept focuses on how the interactions and support between two individuals can improve their health outcomes.',
//     },
//     {
//       image: tabImage2,
//       title: 'Mental and Emotional Well-being',
//       content: 'Dyadic health approaches are vital for improving mental and emotional well-being. Collaborative health strategies offer mutual benefits for both partners in a relationship.',
//     },
//     {
//       image: tabImage3,
//       title: 'Shared Fitness Goals',
//       content: 'Successful dyadic health interventions include shared fitness goals and emotional support. Health professionals can guide couples towards holistic well-being.',
//     },
//     {
//       image: tabImage4,
//       title: 'Communication in Dyadic Health',
//       content: 'Effective communication helps in fostering healthier relationships and plays a significant role in dyadic health outcomes.',
//     },
//     {
//       image: tabImage5,
//       title: 'Emotional and Social Well-being',
//       content: 'Dyadic health isn’t just physical; it also involves emotional and social well-being. It’s about building resilience as a pair through various challenges.',
//     },
//   ];

//   return (
//     <Paper elevation={3} sx={{ padding: 2 }}>
//       <Box sx={{ width: '100%', padding: { xs: '20px', sm: '30px' }, backgroundColor: '#f4f6f8' }}>
//         {/* Title */}
//         <Typography
//           variant="h4"
//           sx={{
//             marginBottom: { xs: '20px', sm: '30px', md: '50px' },
//             color: '#37474f',
//             textAlign: 'center',
//             fontWeight: 'bold',
//             fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px', xl: '30px' },
//           }}
//         >
//           Know More About Dyadic Health
//         </Typography>

//         {/* Tabs Section */}
//         <Tabs
//           value={value}
//           onChange={handleTabChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//           aria-label="tabs"
//           sx={{
//             borderBottom: 'none',
//             backgroundColor: '#0288d1',
//             borderTopLeftRadius: '15px',
//             borderTopRightRadius: '15px',
//           }}
//         >
//           {tabData.map((tab, index) => (
//             <Tab
//               key={index}
//               label={
//                 <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', marginRight: '4px' }}>
//                   <img
//                     src={tab.image}
//                     alt={`Tab ${index + 1}`}
//                     loading="lazy"
//                     style={{
//                       width: '100%',
//                       height: '120px',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                     }}
//                   />
//                 </Box>
//               }
//               sx={{
//                 '&:hover img': {
//                   transform: 'scale(1.1)',
//                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                 },
//                 '&.Mui-selected': {
//                   backgroundColor: '#fff',
//                   color: '#0288d1',
//                   borderBottom: '2px solid #0288d1',
//                 },
//               }}
//             />
//           ))}
//         </Tabs>

//         {/* Content Section */}
//         <Box
//           sx={{
//             position: 'relative',
//             height: '300px',
//             overflow: 'hidden',
//             backgroundColor: '#fff',
//             borderTopLeftRadius: 0,
//             borderTopRightRadius: 0,
//             borderBottomLeftRadius: '15px',
//             borderBottomRightRadius: '15px',
//             border: '1px solid #ddd',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//           }}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={value}
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '-100%', opacity: 0 }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               style={{ position: 'absolute', width: '100%', height: '100%' }}
//             >
//               <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, height: '100%', justifyContent: 'center' }}>
//                 <Typography variant="h5" gutterBottom color="primary">
//                   {tabData[value].title}
//                 </Typography>
//                 <Typography variant="body1">{tabData[value].content}</Typography>
//               </Box>
//             </motion.div>
//           </AnimatePresence>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default TabSection;
