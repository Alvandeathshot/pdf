// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project imports
// import AboutHeading from 'sections/extra-pages/about/aboutheading';
// import AboutHeader from 'sections/extra-pages/about/AboutHeader';
// import VisionSection from 'sections/extra-pages/about/VisionSection';
// import CEOInfo from 'sections/extra-pages/about/CEOInfo';

// // ==============================|| ABOUT US - MAIN ||============================== //

// export default function AboutUs() {
//   return (
//     <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4, mb: 12 }}>
//       {/* Spacer to move the content down */}
//       <Grid item xs={12} sx={{ mt: 10 }}>
//       <AboutHeading />
//         {/* New content above the boxes */}
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: 'center', mb: 4 }}>
//             <br />
//             {/* Reverse Pyramid Text */}
//             <Box sx={{ textAlign: 'left', mx: 'auto', width: 'fit-content' }}>
//               <Typography variant="body1" sx={{ ml: 0 }}>
//                 A healthy lifestyle is all about forming habits- healthy habits. Hence “Healthy Lifestyle System”(HLS) will be a self-paced and
//               </Typography>
//               <Typography variant="body1" sx={{ ml: 2 }}>
//                  application-led series of valuable learnings and interventions to help individuals and Dyads adopt a healthy living style.
//               </Typography>
//             </Box>
//             <br />
//             <Box sx={{ textAlign: 'left', mx: 'auto', width: 'fit-content' }}>
//               <Typography variant="body1" sx={{ ml: 2 }}>
//               HLS will address an individual and progressively optimize for a dyad as a unit to encourage common
//               </Typography>
//               <Typography variant="body1" sx={{ ml: 2 }}>
//               goals and therefore bonding. In conjunction, our tools act as a support mechanism that provides   
//               </Typography>
//               <Typography variant="body1" sx={{ ml: 2 }}>
//               directions for easy regimes and help a dyad as a unit of action-takers for a healthy lifestyle.
//               </Typography>
//             </Box>
//           </Box>
//         </Container>
//       </Grid>

//       {/* Place AboutHeader and VisionSection side by side */}
//       <Grid item xs={12} sm={10} lg={9}>
//         <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 }, mt: 2 }}>
//           <Grid container spacing={4} justifyContent="space-around">
//             <Grid item xs={12} md={5}>
//               <AboutHeader />
//             </Grid>
//             <Grid item xs={12} md={5}>
//               <VisionSection />
//             </Grid>
//           </Grid>
//         </Container>
//       </Grid>
      
//       {/* CEOInfo component */}
//       <Grid item xs={12} sm={10} lg={9}>
//         <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 }, mt: 6 }}>
//           <CEOInfo />
//         </Container>
//       </Grid>
//     </Grid>
//   );
// }








import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';  // Import Helmet for SEO

// project imports
import AboutHeading from 'sections/extra-pages/about/aboutheading';
import AboutHeader from 'sections/extra-pages/about/AboutHeader';
import VisionSection from 'sections/extra-pages/about/VisionSection';
import CEOInfo from 'sections/extra-pages/about/CEOInfo';

// ==============================|| ABOUT US - MAIN ||============================== //

export default function AboutUs() {
  return (
    <>
      {/* SEO Section using React Helmet */}
      <Helmet>
        <title>About Us - Healthy Lifestyle System</title>
        <meta name="description" content="Learn more about Healthy Lifestyle System (HLS), a self-paced and application-led series of learnings to adopt a healthy living style." />
        <meta name="keywords" content="Healthy Lifestyle, HLS, healthy living, self-paced learning, dyad living, wellness" />
        {/* <meta property="og:title" content="About Us - Healthy Lifestyle System" />
        <meta property="og:description" content="Discover the Healthy Lifestyle System, a series of learnings designed to help individuals and dyads adopt healthier habits for a better living." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://example.com/about-us-image.jpg" />
        <meta property="og:url" content="https://example.com/about-us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Healthy Lifestyle System" />
        <meta name="twitter:description" content="Join the Healthy Lifestyle System and improve your wellness journey with self-paced learnings and tools." />
        <meta name="twitter:image" content="https://example.com/about-us-twitter.jpg" />
        <link rel="canonical" href="https://example.com/about-us" /> */}
      </Helmet>

      <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4, mb: 12 }}>
        {/* Spacer to move the content down */}
        <Grid item xs={12} sx={{ mt: 10 }}>
          <AboutHeading />
          {/* New content above the boxes */}
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <br />
              {/* Reverse Pyramid Text */}
              <Box sx={{ textAlign: 'left', mx: 'auto', width: 'fit-content' }}>
                <Typography variant="body1" sx={{ ml: 0 }}>
                  A healthy lifestyle is all about forming habits- healthy habits. Hence “Healthy Lifestyle System”(HLS) will be a self-paced and
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  application-led series of valuable learnings and interventions to help individuals and Dyads adopt a healthy living style.
                </Typography>
              </Box>
              <br />
              <Box sx={{ textAlign: 'left', mx: 'auto', width: 'fit-content' }}>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  HLS will address an individual and progressively optimize for a dyad as a unit to encourage common
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  goals and therefore bonding. In conjunction, our tools act as a support mechanism that provides   
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  directions for easy regimes and help a dyad as a unit of action-takers for a healthy lifestyle.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Grid>

        {/* Place AboutHeader and VisionSection side by side */}
        <Grid item xs={12} sm={10} lg={9}>
          <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 }, mt: 2 }}>
            <Grid container spacing={4} justifyContent="space-around">
              <Grid item xs={12} md={5}>
                <AboutHeader />
              </Grid>
              <Grid item xs={12} md={5}>
                <VisionSection />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        
        {/* CEOInfo component */}
        <Grid item xs={12} sm={10} lg={9}>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 }, mt: 6 }}>
            <CEOInfo />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
