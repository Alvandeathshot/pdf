// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function QuoteOfDay() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h5">Quote of the Day</Typography>
      <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 2 }}>
        "The best way to predict the future is to create it." - Peter Drucker
      </Typography>
    </Box>
  );
}
