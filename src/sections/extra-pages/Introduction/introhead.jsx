// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| CONTACT US - HEADER ||============================== //

export default function IntroHeader() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 0, pb: 0 }}>
      {/* <AuthBackground /> */}
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box sx={{ width: { xs: '100%', sm: 252, md: 360, lg: 436 }, py: 0, mx: 'auto' }}>
          <Stack spacing={0}>
            <Typography align="center" variant="h2">
             Introduction
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
