// material-u
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground'; // Make sure this component/image allows transparency

// ==============================|| ARTICLES - HEADER ||============================== //

export default function ArticlesHeader() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: 9,
        pb: 2,
        width: '100vw', // Full viewport width
        left: '50%', // Centering technique
        ml: '-50vw', // Centering technique
        backgroundColor: '#f5f5f5', // Light gray background color
        zIndex: 0 // Ensure it is behind other content
      }}
    >
      {/* Optional: You might want to make AuthBackground slightly transparent or adjust its styles */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <AuthBackground />
      </Box>
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            width: { xs: '100%', sm: 252, md: 360, lg: 436 },
            py: 6,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Stack spacing={1}>
            <Typography align="center" variant="h2">
              Articles
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
