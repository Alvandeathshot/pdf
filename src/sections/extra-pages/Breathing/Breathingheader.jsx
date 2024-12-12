// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| CONTACT US - HEADER ||============================== //

export default function ContactHeader() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 9, pb: 2 }}>
      <AuthBackground />
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 4 } }}> {/* Increased padding and max width */}
        <Box sx={{ width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' }, py: 6, mx: 'auto' }}> {/* Adjusted width */}
          <Stack spacing={1}>
            <Typography align="center" variant="h2">
              Strengthen Your Personal Foundation
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
 