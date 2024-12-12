import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import AWSCognitoContext from 'src/contexts/AWSCognitoContext'; // Assuming the context is already set up for AWS Cognito

export default function ProfileCompletionPage() {
  const { user, completeProfile } = useContext(AWSCognitoContext); // Get user and completeProfile function from context
  const [profileData, setProfileData] = useState({ age: '', gender: '' });

  const handleSubmit = () => {
    completeProfile(user.email, profileData);
    // Redirect to dashboard after completion
    window.location.href = '/dashboard'; // Adjust the URL based on your routing
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" mb={3}>
        Complete Your Profile
      </Typography>
      <TextField
        label="Age"
        fullWidth
        margin="normal"
        value={profileData.age}
        onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
      />
      <TextField
        label="Gender"
        fullWidth
        margin="normal"
        value={profileData.gender}
        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}
