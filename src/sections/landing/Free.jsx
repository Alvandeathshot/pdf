// material-ui
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; // Import TextField component
import { useState } from 'react';

// project-imports
import FadeInWhenVisible from './Animation';
// assets
import { ExportSquare } from 'iconsax-react';

// ==============================|| LANDING - FreePage ||============================== //

const FreePage = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false); // State for name error
  const [submitSuccess, setSubmitSuccess] = useState(null); // State for submission success message
  const [submitError, setSubmitError] = useState(null); // State for submission error message

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    validateName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    validateName(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/; // Simple regex for alphabetic names
    const isValid = nameRegex.test(name);
    setNameError(!isValid);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!emailError && email && !nameError && firstName && lastName) {
      try {
        const response = await fetch('https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, firstName, lastName }),
        });

        if (response.ok) {
          const result = await response.json();
          setSubmitSuccess(result.message);
          setSubmitError(null);
        } else {
          const errorResult = await response.json();
          setSubmitSuccess(null);
          setSubmitError(errorResult.error || 'Failed to subscribe.');
        }
      } catch (error) {
        setSubmitSuccess(null);
        setSubmitError('An error occurred. Please try again later.');
        console.error('Subscription error:', error);
      }
    } else {
      setSubmitSuccess(null);
      setSubmitError('Please enter valid information.');
    }
  };

  return (
    <Container ref={ref}>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 }, background: "#ffffff" }}>
        <Grid item xs={12}>
          <FadeInWhenVisible>
            <Box textAlign="center">
              <Typography variant="h2">
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.primary.main
                  }}
                >
                  Subscribe{' '}
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                For exclusive updates about the offerings, newsletters and personalized content.
              </Typography>
            </Box>
          </FadeInWhenVisible>
        </Grid>
        <Grid item xs={12} md={6}>
          <FadeInWhenVisible>
            <Box
              sx={{
                width: '100%', // Adjust width as needed
                mx: 'auto', // Center the box horizontally
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* First Name input field */}
                  <TextField
                    label="First Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={nameError && firstName !== ''}
                    helperText={nameError && firstName !== '' ? 'Please enter a valid first name' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Last Name input field */}
                  <TextField
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={nameError && lastName !== ''}
                    helperText={nameError && lastName !== '' ? 'Please enter a valid last name' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Email input field */}
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? 'Please enter a valid email address' : ''}
                  />
                </Grid>
              </Grid>
              {/* Success or error messages */}
              {submitSuccess && <Typography color="success.main">{submitSuccess}</Typography>}
              {submitError && <Typography color="error.main">{submitError}</Typography>}
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ExportSquare />}
                onClick={handleSubmit}
                disabled={!email || emailError || !firstName || !lastName || nameError} // Disable button if input is invalid or empty
              >
                Subscribe
              </Button>
            </Box>
          </FadeInWhenVisible>
        </Grid>
      </Grid>
    </Container>
  );
});

export default FreePage;
