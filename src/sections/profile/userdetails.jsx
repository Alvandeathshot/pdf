// material-ui
import Box from '@mui/material/Box';
import React, { useState, useEffect, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Button, TextField, Select, MenuItem, FormControl } from '@mui/material'; // Import necessary components
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { PatternFormat } from 'react-number-format';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import defaultImages from 'assets/images/users/avatar-8.png';
import { CallCalling, Gps, Sms } from 'iconsax-react';
import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'; // Added PutItemCommand for saving profile data
import AWSCognitoContext from 'src/contexts/AWSCognitoContext'; // Import Cognito context
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'; // Import Radio components


export default function DiscussionBoard() {

    const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md')); // Detect mobile views
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Detect tablet views
    const matchDownXL = useMediaQuery((theme) => theme.breakpoints.down('xl','lg')); 
    const { user } = useContext(AWSCognitoContext);  // Get email from Cognito context
  
    const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is enabled
    const [isEditingGoals, setIsEditingGoals] = useState(false); // State for goals edit mode
    const [profile, setProfile] = useState({
      firstName: '',  // Placeholder for first name
      lastName: '',   // Placeholder for last name
      email: user?.email || 'No Email', // Email from Cognito
      phone: '(+1-876) 8654 239 581',  // Placeholder for phone
      country: 'New York',
      zipCode: '956 754',
      Age: '', // Placeholder for age
      address: '',  // Placeholder for address
      gender: '', // Placeholder for gender
      height: '',   // Placeholder for height
      weight: '',    // Placeholder for weight
      goals: '', // Placeholder for fitness goals
      exercisePreferences: '', // Placeholder for exercise preferences
    });
  
    const handleEditToggle = () => setIsEditing(!isEditing); // Toggle edit mode
    const handleEditGoalsToggle = () => setIsEditingGoals(!isEditingGoals); // Toggle edit mode for goals
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    };
  
    const dynamoDbClient = new DynamoDBClient({
      region: 'us-west-2', // Replace with your region
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
      }
    });
  
    // Fetch user data (firstName, lastName, etc.) from DynamoDB using email
    const fetchUserDataFromDynamoDB = async (email) => {
      const params = {
        TableName: 'Register_Data', // Replace with your DynamoDB table name
        Key: {
          email: { S: email }
        }
      };
      try {
        const command = new GetItemCommand(params);
        const data = await dynamoDbClient.send(command);
        if (data.Item) {
          return {
            firstName: data.Item.firstName?.S || '',  // Fetch first name
            lastName: data.Item.lastName?.S || '',    // Fetch last name
            phone: data.Item.phone?.S || '',          // Fetch phone
            country: data.Item.country?.S || '',      // Fetch country
            zipCode: data.Item.zipCode?.S || '',      // Fetch zip code
            address: data.Item.address?.S || '',      // Fetch address
            Age: data.Item.Age?.S || '',              // Fetch age
            gender: data.Item.gender?.S || '',        // Fetch gender
            height: data.Item.height?.S || '',        // Fetch height
            weight: data.Item.weight?.S || '',        // Fetch weight
            goals: data.Item.goals?.S || '',          // Fetch goals
            exercisePreferences: data.Item.exercisePreferences?.S || '', // Fetch exercise preferences
            password: data.Item.password?.S || '',    // Fetch password
            created_at: data.Item.created_at?.S || '' // Fetch createdTime
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching user data from DynamoDB:', error);
        return null;
      }
    };
  
    // Save updated profile to DynamoDB (merge new data with existing)
    const saveProfileToDynamoDB = async (profileData) => {
      // Fetch existing data first
      const existingData = await fetchUserDataFromDynamoDB(profileData.email);
  
      if (existingData) {
        // Merge the new data with the existing data
        const mergedData = {
          ...existingData, // Keep existing fields (like password, createdTime)
          ...profileData   // Overwrite with updated profile data
        };
  
        const params = {
          TableName: 'Register_Data', // Your DynamoDB table name
          Item: {
            email: { S: mergedData.email }, // Email is the primary key
            firstName: { S: mergedData.firstName || 'Anonymous' },  // Save first name
            lastName: { S: mergedData.lastName || '' },             // Save last name
            phone: { S: mergedData.phone || '' },                   // Save phone
            country: { S: mergedData.country || '' },               // Save country
            zipCode: { S: mergedData.zipCode || '' },               // Save zip code
            address: { S: mergedData.address || '' },               // Save address
            Age: { S: mergedData.Age || '' },                       // Save age
            gender: { S: mergedData.gender || '' },                 // Save gender
            height: { S: mergedData.height || '' },                 // Save height
            weight: { S: mergedData.weight || '' },                 // Save weight
            goals: { S: mergedData.goals || '' },                   // Save goals
            exercisePreferences: { S: mergedData.exercisePreferences || '' }, // Save exercise preferences
            password: { S: mergedData.password || '' },             // Preserve password
            created_at: { S: mergedData.created_at || '' }        // Preserve createdTime
          }
        };
  
        try {
          const command = new PutItemCommand(params); // Use PutItemCommand to save profile data
          await dynamoDbClient.send(command);
          console.log('Profile saved successfully!');
        } catch (error) {
          console.error('Error saving profile to DynamoDB:', error);
        }
      }
    };
  
    // Handle save button click for personal details
    const handleSave = async () => {
      if (isEditing) {
        await saveProfileToDynamoDB(profile);  // Save profile to DynamoDB
      }
      setIsEditing(!isEditing);  // Toggle editing mode
    };
  
    // Handle save button click for goals
    const handleSaveGoals = async () => {
      if (isEditingGoals) {
        await saveProfileToDynamoDB(profile);  // Save updated goals to DynamoDB
      }
      setIsEditingGoals(!isEditingGoals);  // Toggle editing mode for goals
    };
  
    // Load firstName, lastName, etc. from DynamoDB when the component mounts
    useEffect(() => {
      const loadUserData = async () => {
        const userEmail = user?.email || localStorage.getItem('userEmail'); // Use email from Cognito or localStorage
        if (userEmail) {
          const userData = await fetchUserDataFromDynamoDB(userEmail);
          if (userData) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              firstName: userData.firstName,        // Set first name
              lastName: userData.lastName,          // Set last name
              phone: userData.phone,                // Set phone
              country: userData.country,            // Set country
              zipCode: userData.zipCode,            // Set zip code
              address: userData.address,            // Set address
              Age: userData.Age,                    // Set age
              gender: userData.gender,              // Set gender
              height: userData.height,              // Set height
              weight: userData.weight,              // Set weight
              goals: userData.goals,                // Set goals
              exercisePreferences: userData.exercisePreferences // Set exercise preferences
            }));
          }
        }
      };
      loadUserData();
    }, [user]);
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Profile Details</Typography>
      <Box sx={{ mt: 2, p: 2, border: '1px solid gray', borderRadius: 2 }}>
      <Grid item xs={12} sm={12} md={12} xl={12}
      sx={{mb:1}}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar 1" size="xl" src={defaultImages} />
                    <Stack spacing={0.5} alignItems="center" align={matchDownSM ? 'center' : 'left'}>
                      <Typography variant="h5">
                        {`${profile.firstName} ${profile.lastName}`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <Sms size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align={matchDownSM ? 'center' : 'right'} >{profile.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CallCalling size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align={matchDownSM ? 'center' : 'right'}>{profile.phone}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Gps size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align={matchDownSM ? 'center' : 'right'}>{profile.country}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        {/* Goals Section */}
        <Grid item xs={6}>
            <MainCard title="Goals">
                <List sx={{ py: 0 }}>
                    <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                    <Typography color="secondary">What are your primary fitness goals?</Typography>
                                    <Typography>{profile.goals || 'Your Goals Not Set'}</Typography>
                                  </Stack>
                              </Grid>
                            </Grid>
                      </ListItem>

        {/* Exercise Preferences Section */}
        <ListItem divider>
          <Grid container spacing={matchDownMD ? 0.5 : 3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">What types of exercise do you enjoy?</Typography>
                <Typography>{profile.exercisePreferences || 'Exercise Preferences Not Set'}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </MainCard>
  </Grid>

  {/* Calculated Metrics Section
  <Grid item xs={6}>
    <MainCard title="Calculated Metrics">
      <List sx={{ py: 0 , maxHeight:174}}>
        <ListItem divider>
          <Grid container spacing={matchDownMD ? 0.5 : 3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5} >
                <Typography color="secondary">BMI</Typography>
                <Typography>{profile.bmi || 'BMI not calculated yet'}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem divider>
          <Grid container spacing={matchDownMD ? 0.5 : 3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Body Fat Percentage</Typography>
                <Typography>{profile.bodyFat || 'Body Fat not calculated yet'}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem divider>
          <Grid container spacing={matchDownMD ? 0.5 : 3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={0.5}>
                <Typography color="secondary">Muscle Mass</Typography>
                <Typography>{profile.muscleMass || 'Muscle Mass not calculated yet'}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </MainCard>
  </Grid> */}

  {/* Calculated Metrics Section */}
<Grid item xs={6}>
    <MainCard title="Calculated Metrics">
        <List sx={{ py: 0 }}>
            <ListItem divider sx={{ py: 0.5 }}>
                <Grid container spacing={matchDownMD ? 0.5 : 1.5}>
                    <Grid item xs={12}>
                        <Stack spacing={0.3}>
                            <Typography color="secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>BMI</Typography>
                            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                {profile.bmi || 'BMI not calculated yet'}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem divider sx={{ py: 0.5 }}>
                <Grid container spacing={matchDownMD ? 0.5 : 1.5}>
                    <Grid item xs={12}>
                        <Stack spacing={0.3}>
                            <Typography color="secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Body Fat Percentage</Typography>
                            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                {profile.bodyFat || 'Body Fat not calculated yet'}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem divider sx={{ py: 0.5 }}>
                <Grid container spacing={matchDownMD ? 0.5 : 1.5}>
                    <Grid item xs={12}>
                        <Stack spacing={0.3}>
                            <Typography color="secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Muscle Mass</Typography>
                            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                {profile.muscleMass || 'Muscle Mass not calculated yet'}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </ListItem>
        </List>
    </MainCard>
</Grid>

</Grid>
</Box>
</Box>
  );
}