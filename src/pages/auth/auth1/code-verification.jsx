import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthCodeVerification from 'sections/auth/auth-forms/AuthCodeVerification';

// Function to mask email
const maskEmail = (email) => {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  const maskedLocalPart = localPart.length > 2 ? `${localPart[0]}****${localPart.slice(-1)}` : localPart;
  return `${maskedLocalPart}@${domain}`;
};

// ================================|| CODE VERIFICATION ||================================ //

export default function CodeVerification() {
  let email = window.localStorage.getItem('email');
  const maskedEmail = email ? maskEmail(email) : '****@gmail.com'; // Mask the email

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">Enter Verification Code</Typography>
            <Typography color="secondary">We sent you a code on {maskedEmail}.</Typography> {/* Use masked email */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthCodeVerification />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
