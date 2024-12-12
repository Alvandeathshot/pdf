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

export default function TabProfile() {
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
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
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
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Personal Details">
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={handleSave} // Use handleSave for the save button
                  sx={{
                    mt: -2,
                    ml: matchDownXL ? 'auto' : 'auto',
                    display: 'block',
                    borderColor: isEditing ? 'green' : 'blue',
                    color: isEditing ? 'green' : 'blue',
                    '&:hover': {
                      backgroundColor: isEditing ? 'rgba(0, 128, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)',
                    }
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>

              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        {isEditing ? (
                          <TextField
                            name="firstName"
                            placeholder="Enter First Name"
                            value={profile.firstName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Typography>{`${profile.firstName || 'First Name Not set'} ${profile.lastName}`}</Typography>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Address</Typography>
                        {isEditing ? (
                          <TextField
                          name="address"
                          placeholder="Enter Address"
                          value={profile.address}
                          onChange={handleInputChange}
                          />
                        ) : (
                        <Typography>{profile.address || 'Address Not Set'}</Typography>
                        )}
                        </Stack>
                        </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Age</Typography>
                        {isEditing ? (
                          <TextField
                            name="Age"
                            placeholder='Enter Your Age'
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Typography>{profile.Age || 'Age Not Set'}</Typography>
                        )}
                      </Stack>
                      </Grid>
                      {/* Height Field */}
                      <Grid item xs={12} md={6}>
                         <Stack spacing={0.5}>
                          <Typography color="secondary">Height (cm)</Typography>
                           {isEditing ? (
                             <TextField
                               name="height"
                               placeholder="Enter Height"
                               value={profile.height}
                               onChange={handleInputChange}
                             />
                           ) : (
                             <Typography>{profile.height || 'Height Not Set'}</Typography>
                           )}
                         </Stack>
                       </Grid>
                    </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    {/* Gender Field */}
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Gender</Typography>
                          {isEditing ? (
                            <FormControl fullWidth>
                              <Select
                                name="gender"
                                value={profile.gender}
                                onChange={handleInputChange}
                                displayEmpty
                              >
                                <MenuItem value=""><em>Select gender</em></MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography>{profile.gender}</Typography>
                          )}
                        </Stack>
                      </Grid>
                      {/* Weight Field */}
                      <Grid item xs={12} md={6}>
                         <Stack spacing={0.5}>
                           <Typography color="secondary">Weight (kg)</Typography>
                           {isEditing ? (
                             <TextField
                               name="weight"
                               placeholder="Enter Weight"
                               value={profile.weight}
                               onChange={handleInputChange}
                             />
                           ) : (
                             <Typography>{profile.weight || 'Weight Not Set'}</Typography>
                           )}
                         </Stack>
                       </Grid>
                    </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        {isEditing ? (
                          <TextField
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Typography>
                            <PatternFormat
                              value={profile.phone}
                              displayType="text"
                              type="text"
                              format="#### ### ###"
                            />
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        {isEditing ? (
                          <TextField
                            name="country"
                            value={profile.country}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Typography>{profile.country}</Typography>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
        
                          <Typography>{profile.email}</Typography>

                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        {isEditing ? (
                          <TextField
                            name="zipCode"
                            value={profile.zipCode}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Typography>{profile.zipCode}</Typography>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
          </Grid>

          </MainCard>

          </Grid>

          <Grid item xs={12}>
            <MainCard title="Goals">
            <Button
                variant="outlined"
                onClick={handleSaveGoals} // Use handleSaveGoals for the save button in Goals
                sx={{
                  mt: -2,
                  ml: matchDownXL ? 'auto' : 'auto',
                  display: 'block',
                  borderColor: isEditingGoals ? 'green' : 'blue',
                  color: isEditingGoals ? 'green' : 'blue',
                  '&:hover': {
                    backgroundColor: isEditingGoals ? 'rgba(0, 128, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)',
                  }
                }}
              >
                {isEditingGoals ? 'Save' : 'Edit'}
              </Button>
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                  <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">What are your primary fitness goals?</Typography>
                        {isEditingGoals ? (
                          <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="fitness-goals"
                            name="goals"
                            value={profile.goals}
                            onChange={handleInputChange}
                          >
                            <FormControlLabel value="Weight Lose" control={<Radio />} label="Weight Lose" />
                            <FormControlLabel value="Muscle Gain" control={<Radio />} label="Muscle Gain" />
                            <FormControlLabel value="Toning" control={<Radio />} label="Toning" />
                          </RadioGroup>
                        </FormControl>
                      ) : (
                        <Typography>{profile.goals || 'Your Goals Not Set'}</Typography>
                      )}
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>

                {/* Exercise Preferences */}
                <ListItem divider>

                <Grid container spacing={matchDownMD ? 0.5 : 3}>
                  <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">What types of exercise do you enjoy?</Typography>
                        {isEditingGoals ? (
                          <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="exercise-preferences"
                            name="exercisePreferences"
                            value={profile.exercisePreferences}
                            onChange={handleInputChange}
                          >
                            <FormControlLabel value="Strength Training" control={<Radio />} label="Strength Training" />
                            <FormControlLabel value="Cardio" control={<Radio />} label="Cardio" />
                            <FormControlLabel value="Yoga or Pilates" control={<Radio />} label="Yoga or Pilates" />
                            <FormControlLabel value="HIIT" control={<Radio />} label="HIIT" />
                            <FormControlLabel value="Walking or Hiking" control={<Radio />} label="Walking or Hiking" />
                            <FormControlLabel value="Team sports" control={<Radio />} label="Team sports" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                          </RadioGroup>
                        </FormControl>
                      ) : (
                        <Typography>{profile.exercisePreferences || 'Your Goals Not Set'}</Typography>
                      )}
                      </Stack>
                    </Grid>
                  </Grid>
                  </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
  // const [profile, setProfile] = useState({
  //   firstName: 'Anonymous',  // Default value for first name
  //   lastName: '',            // Default value for last name
  //   email: user?.email || 'No Email', // Email from Cognito
  //   phone: '(+1-876) 8654 239 581',  // Placeholder phone
  //   country: 'New York',
  //   zipCode: '956 754',
  //   address: 'Street 110-B Kalians Bag, Dewan, M.P. New York'
  // });
{/* <ListItem>
                      <ListItemIcon>
                        <Link1 size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Link align="right" href="https://google.com" target="_blank">
                          https://anshan.dh.url
                        </Link>
                      </ListItemSecondaryAction>
                    </ListItem> */}

                    {/* <Grid item xs={12}>
            <MainCard title="Skills">
              <Grid container spacing={1.25}>
                <Grid item xs={6}>
                  <Typography color="secondary">Junior</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">UX Researcher</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={80} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">WordPress</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={90} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">HTML</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Graphic Design</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={95} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Code Style</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={75} />
                </Grid>
              </Grid>
            </MainCard>
          </Grid> */}
          {/* <Grid item xs={12}>
            <MainCard title="About me">
              <Typography color="secondary">
                Hello, I’m {profile.firstName} Handgun, a Creative Graphic Designer & User Experience Designer based in Website. I create digital products that are more beautiful and usable. Morbid accusant ipsum. Nam nec tellus at.
              </Typography>
            </MainCard>
          </Grid> */}
          {/* <Grid item xs={12}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        <Typography>{`${profile.firstName} ${profile.lastName}`}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Father Name</Typography>
                        <Typography>Mr. Deepen Handgun</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        <Typography>
                          <PatternFormat value={profile.phone} displayType="text" type="text" format="#### ### ###" />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>{profile.country}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography>{profile.email}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography>{profile.zipCode}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    <Typography>{profile.address}</Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid> */}
          {/* <Grid item xs={12}>
            <MainCard title="Education">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Master Degree (Year)</Typography>
                        <Typography>2014-2017</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>-</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Bachelor (Year)</Typography>
                        <Typography>2011-2013</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>Imperial College London</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">School (Year)</Typography>
                        <Typography>2009-2011</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>School of London, England</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid> */}
          {/* <Grid item xs={12}>
            <MainCard title="Employment">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                        <Typography>2019-Current</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Job Responsibility</Typography>
                        <Typography>
                          Perform task related to project manager with the 100+ team under my observation. Team management is key role in
                          this company.
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                        <Typography>2017-2019</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Job Responsibility</Typography>
                        <Typography>Team management is key role in this company.</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid> */}