import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| CONTACT US - HEADER ||============================== //

export default function Trainingheader() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 9, pb: 2, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}>
      <AuthBackground />
      <Box sx={{ py: 6 }}>
        <Stack spacing={1} sx={{ textAlign: 'center', width: { xs: '100%', sm: 252, md: 360, lg: 436 }, mx: 'auto' }}>
          <Typography align="center" variant="h2">
            Learn more about DH
          </Typography>
          <Typography align="center" color="text.secondary">
            We are here to help you learn about DH
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
