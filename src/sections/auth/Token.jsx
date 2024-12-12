import { useEffect, useState } from 'react';
import { useContext } from 'react';
import AWSCognitoContext from 'contexts/AWSCognitoContext.jsx';  // Adjust the path as needed
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ==============================|| LANDING - TokenPage ||============================== //

export default function TokenPage() {
  const theme = useTheme();
  const { user, uuid } = useContext(AWSCognitoContext);  // Access user and UUID from context

  // Local state to store the session info
  const [sessionName, setSessionName] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const [userUUID, setUserUUID] = useState('');

  // Effect to update the state when context changes
  useEffect(() => {
    if (user) {
      setSessionName(user.name || '');
      setSessionEmail(user.email || '');
    }
  
    if (uuid) {
      setUserUUID(uuid);  // Ensure the UUID is set correctly
      console.log('Cognito Username (UUID) set in TokenPage:', uuid);  // Log UUID to check if it's being passed
    } else {
      console.log('UUID not available in TokenPage');
    }
  }, [user, uuid]);

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '75%',
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box mt={2} textAlign="center">
              <Typography variant="h6">Session Data:</Typography>
              <Typography variant="body1">Name: {sessionName}</Typography>
              <Typography variant="body1">Email: {sessionEmail}</Typography>
              <Typography variant="body1">User UUID: {userUUID || 'Not available'}</Typography> {/* Display UUID */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
