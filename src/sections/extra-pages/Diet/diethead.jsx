import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AuthBackground from 'assets/images/auth/AuthBackground';

export default function DietHeader() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 9, pb: 2 }}>
      <AuthBackground />
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box sx={{ width: { xs: '100%', sm: 252, md: 360, lg: 436 }, py: 6, mx: 'auto' }}>
          <Stack spacing={1}>
            <Typography 
              align="center" 
              variant="h2" 
              // sx={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }} 
              aria-label="Diet Page Header"
            >
              Diet
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
