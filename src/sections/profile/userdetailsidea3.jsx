import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import AWSCognitoContext from 'src/contexts/AWSCognitoContext';
import { useNavigate } from 'react-router-dom';
import { CallCalling, Gps, Sms } from 'iconsax-react';
import profileImage from 'assets/images/landingImages/LandingImagess2/CaregivingandSibling.png';
import BackgroundImage from 'assets/images/dashboard/BackgroundProfile.jpg';

const PatientCard = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md')); // Detect mobile views
  const navigate = useNavigate();
  const { user } = useContext(AWSCognitoContext); // Get email from Cognito context
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
  });

  const handleViewProfile = () => {
    navigate('/apps/profiles/account/basic');
  };

  const dynamoDbClient = new DynamoDBClient({
    region: 'us-west-2',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
  });

  const fetchUserDataFromDynamoDB = async (email) => {
    const params = {
      TableName: 'Register_Data',
      Key: {
        email: { S: email },
      },
    };
    try {
      const command = new GetItemCommand(params);
      const data = await dynamoDbClient.send(command);
      if (data.Item) {
        return {
          firstName: data.Item.firstName?.S || '',
          lastName: data.Item.lastName?.S || '',
          phone: data.Item.phone?.S || '',
          country: data.Item.country?.S || '',
          goals: data.Item.goals?.S || '',
          exercisePreferences: data.Item.exercisePreferences?.S || '',
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data from DynamoDB:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userEmail = user?.email || localStorage.getItem('userEmail');
      if (userEmail) {
        const userData = await fetchUserDataFromDynamoDB(userEmail);
        if (userData) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...userData,
          }));
        }
      }
    };
    loadUserData();
  }, [user]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '76.5vw',
        height: 'auto',
        margin: 'auto',
        marginTop: 5,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Profile Image and Name */}
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={profileImage}
          alt="Avatar"
          sx={{
            borderRadius: '50%',
            width: '100px', // Smaller image
            height: '100px',
            objectFit: 'cover',
            marginBottom: 2,
            border: '3px solid #fff',  // White border
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Soft shadow
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: 1,
          }}
        >
          {`${profile.firstName} ${profile.lastName}`}
        </Typography>
      </Box>

      {/* Profile Info Box */}
      <Box
        sx={{
          width: '80%',
          marginTop: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" color="text.primary">
                <Sms size={18} />
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  {user?.email || 'Not available'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" color="text.primary">
                    <CallCalling size={18} />
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  {profile.phone || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" color="text.primary">
                    <Gps size={18} />
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  {profile.country || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Goals Box */}
      <Box
        sx={{
          width: '80%',
          marginTop: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography color="secondary">What are your primary fitness goals?</Typography>
                <Typography>{profile.goals || 'Your Goals Not Set'}</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <Typography color="secondary">What types of exercise do you enjoy?</Typography>
              <Typography>{profile.exercisePreferences || 'Exercise Preferences Not Set'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientCard;
