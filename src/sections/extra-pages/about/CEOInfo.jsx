// import React from 'react';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import SridharImage from '../../../assets/images/aboutus/Sridhar-image-369x369.jpg';
// import Grid from '@mui/material/Grid';
// import { Container } from '@mui/system';

// export default function CEOInfo() {
//   return (
//     <Container 
//       sx={{ 
//         mt: 10, 
//         maxWidth: 'sm', // or use maxWidth="xs" to make it even smaller
//         width: '50%', // or set a specific width like '400px' for more control
//       }}
//     >
//       <Box sx={{ my: 4, py: 4, textAlign: 'center' }}>
//         <Avatar
//           alt="CEO"
//           src={SridharImage} // Using the imported image
//           sx={{ width: 120, height: 120, margin: 'auto' }}
//         />
//         <Typography variant="h5" align="center" gutterBottom>
//           Sridhar Nagulavancha, CEO
//         </Typography>
//         <Typography variant="body1" align="center">
//           Sridhar Nagulavancha is the founder and CEO of Dyadic Health. He is a software entrepreneur and a health enthusiast. He has been involved in building software for over 25 years. Prior to 2008, he worked in a variety of software roles as a programmer, Dev ops and Software architect in Digital Commerce, AT&T, Freddie Mac and Software AG. He was involved in a software services firm from 2009 to 2017. From 2018, he is involved in guiding startups and was active with triathlons and Iron man races.
//         </Typography>
//       </Box>
//     </Container>
//   );
// }






import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import SridharImage from '../../../assets/images/aboutus/Sridhar-image-369x369.jpg';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider

export default function CEOInfo() {
  return (
    <HelmetProvider>
      <React.Fragment>
        {/* Dynamic SEO using Helmet */}
        <Helmet>
          <title>Dyadic Health | Sridhar Nagulavancha, CEO</title>
          <meta
            name="description"
            content="Meet Sridhar Nagulavancha, CEO and founder of Dyadic Health, with over 25 years of experience in software and health technology innovation."
          />
          <meta
            name="keywords"
            content="Sridhar Nagulavancha, Dyadic Health CEO, software entrepreneur, health technology, startup leadership"
          />
          <meta property="og:title" content="Sridhar Nagulavancha - CEO of Dyadic Health" />
          <meta
            property="og:description"
            content="Learn about Sridhar Nagulavancha, the CEO and visionary leader of Dyadic Health, with vast experience in software development and health-focused innovations."
          />
          <meta property="og:image" content="https://dyadichealth.com/assets/images/aboutus/Sridhar-image-369x369.jpg" />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content="https://dyadichealth.com/about-us/sridhar-nagulavancha" />
          {/* Viewport meta tag for mobile responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>

        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Box sx={{ my: 4, py: 4, textAlign: 'center' }}>
            <Avatar
              alt="CEO"
              src={SridharImage}
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                margin: 'auto',
              }}
            />
            <Typography variant="h5" align="center" gutterBottom>
              Sridhar Nagulavancha, CEO
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
              CEO, Dyadic Health
            </Typography>
            <Typography variant="body1" align="center">
              Sridhar Nagulavancha is the founder and CEO of Dyadic Health. He is a software entrepreneur and a health enthusiast. He has been involved in building software for over 25 years. Prior to 2008, he worked in a variety of software roles as a programmer, Dev ops and Software architect in Digital Commerce, AT&T, Freddie Mac and Software AG. He was involved in a software services firm from 2009 to 2017. From 2018, he is involved in guiding startups and was active with triathlons and Iron man races.
            </Typography>
          </Box>
        </Container>
      </React.Fragment>
    </HelmetProvider>
  );
}