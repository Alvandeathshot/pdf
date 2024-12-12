// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| CONTACT US - HEADER ||============================== //

export default function AboutHeading() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 9, pb: 2 }}>
      <AuthBackground />
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 0 } }}>
        <Box sx={{ width: { xs: '100%', sm: 252, md: 360, lg: 436 }, py: 2, mx: 'auto' }}>
          <Stack spacing={1} alignItems="center">
            <Typography 
              variant="h1" 
              fontWeight="bold" 
              gutterBottom 
              sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
            >
              Empowering Relationships Through
            </Typography>
            <Typography 
              variant="h1" 
              fontWeight="bold" 
              gutterBottom 
              sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
            >
              Holistic Wellness
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
