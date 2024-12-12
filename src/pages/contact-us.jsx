// material-ui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider

// project imports
import ContactForm from 'sections/extra-pages/contact/ContactForm';
import ContactHeader from 'sections/extra-pages/contact/ContactHeader';
import ContactEmail from 'sections/extra-pages/contact/ContactEmail';
// import TockenPage from 'sections/extra-pages/tocken'; // Uncomment if needed

// ==============================|| CONTACT US - MAIN ||============================== //

export default function ContactUS() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact Us - Get in Touch with Our Team</title>
        <meta
          name="description"
          content="Reach out to us through our contact form or email. We are here to assist you with any inquiries or support you need."
        />
        <meta
          name="keywords"
          content="Contact us, support, inquiries, customer service, email us"
        />
        <link rel="canonical" href="https://yourwebsite.com/contact" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Us | Dyadic Health" />
        <meta property="og:description" content="Reach out to us through our contact form or email. We are here to assist you with any inquiries or support you need." />
        <meta property="og:url" content="https://dyadichealth.com/contact" />
        <meta property="og:type" content="website" />
        {/* Viewport meta tag for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Helmet>

      <Grid container spacing={12} justifyContent="center" alignItems="center" sx={{ mb: 12 }}>
        <Grid item xs={12} md={12}>
          <ContactHeader />
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
            <ContactForm />
          </Container>
        </Grid>
        <Grid item xs={12} md={12}>
          <ContactEmail />
        </Grid>
        {/* Uncomment below if you want to include TockenPage */}
        {/* <Grid item xs={12} md={12}>
          <TockenPage />
        </Grid> */}
      </Grid>
    </HelmetProvider>
  );
}
