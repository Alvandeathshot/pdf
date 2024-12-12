// import React, { useState, useEffect, useContext } from 'react';
// import { Box, Typography, Button, Grid } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import PublicIcon from '@mui/icons-material/Public';
// import WcIcon from '@mui/icons-material/Wc';
// import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
// import AWSCognitoContext from 'src/contexts/AWSCognitoContext';
// import { useNavigate } from 'react-router-dom';
// import profileImage from 'assets/images/landingImages/LandingImagess2/CaregivingandSibling.png';
// import BackgroundImage from 'assets/images/dashboard/BackgroundProfile.jpg';

// const PatientCard = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AWSCognitoContext); // Get email from Cognito context
//   const [profile, setProfile] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     country: '',
//     zipCode: '',
//     address: '',
//     Age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     goals: '',
//     exercisePreferences: ''
//   });

//   const handleViewProfile = () => {
//     navigate('/apps/profiles/account/basic');
//   };

//   const dynamoDbClient = new DynamoDBClient({
//     region: 'us-west-2',
//     credentials: {
//       accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
//       secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
//     }
//   });

//   const fetchUserDataFromDynamoDB = async (email) => {
//     const params = {
//       TableName: 'Register_Data',
//       Key: {
//         email: { S: email }
//       }
//     };
//     try {
//       const command = new GetItemCommand(params);
//       const data = await dynamoDbClient.send(command);
//       if (data.Item) {
//         return {
//           firstName: data.Item.firstName?.S || '',
//           lastName: data.Item.lastName?.S || '',
//           phone: data.Item.phone?.S || '',
//           country: data.Item.country?.S || '',
//           zipCode: data.Item.zipCode?.S || '',
//           address: data.Item.address?.S || '',
//           Age: data.Item.Age?.S || '',
//           gender: data.Item.gender?.S || '',
//           height: data.Item.height?.S || '',
//           weight: data.Item.weight?.S || '',
//           goals: data.Item.goals?.S || '',
//           exercisePreferences: data.Item.exercisePreferences?.S || ''
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching user data from DynamoDB:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const loadUserData = async () => {
//       const userEmail = user?.email || localStorage.getItem('userEmail');
//       if (userEmail) {
//         const userData = await fetchUserDataFromDynamoDB(userEmail);
//         if (userData) {
//           setProfile((prevProfile) => ({
//             ...prevProfile,
//             ...userData
//           }));
//         }
//       }
//     };
//     loadUserData();
//   }, [user]);

//   return (
//         <Box
//         sx={{
//           backgroundImage: `url(${BackgroundImage})`,
//           backgroundSize: 'cover', // Ensures the image covers the entire box
//           backgroundPosition: 'center', // Centers the image within the box
//           padding: '20px',
//           borderRadius: '20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: '76.5vw', // Responsive width
//           height: '40vh', // Responsive height
//           margin: 'auto',
//           marginTop: theme => theme.spacing(5), // Dynamic spacing
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for a polished look
//           marginRight:'40px',
//         }}
//       >
//       {/* Left Section: Avatar and Profile Button */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//           width: '25%'
//         }}
//       >
//         <Box
//           component="img"
//           src={profileImage}
//           alt="Avatar"
//           sx={{
//             borderRadius: '50%',
//             width: '150px',
//             height: '150px',
//             objectFit: 'cover',
//             marginLeft: 5
//           }}
//         />
//       </Box>

//       {/* Middle Section: Name and Title */}
//       <Box sx={{ width: '35%' }}>
//         <Typography
//           variant="body1"
//           sx={{
//             fontSize: '16px',
//             color: '#000',
//             marginBottom: '5px'
//           }}
//         >
//           Dyadic Health
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             fontSize: '20px',
//             fontWeight: 'bold',
//             color: '#000'
//           }}
//         >
//           {`${profile.firstName} ${profile.lastName}`}
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: '#ECEDF3',
//             color: '#000',
//             marginTop: '10px',
//             fontWeight: 'bold',
//             fontSize: '12px',
//             textTransform: 'none',
//             ':hover': { backgroundColor: '#fcd89f' }
//           }}
//           onClick={handleViewProfile}
//         >
//           View Profile
//         </Button>
//       </Box>

//       {/* Right Section: Patient Info */}
//       <Box
//         sx={{
//           width: '65%',
//           backgroundColor: '#ffffff',
//           height: '18vh',
//           borderRadius: '20px',
//           padding: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginBottom: 2, // Space between the sections
//         }}
//       >
//         <Grid container spacing={1}>
//           <Grid item xs={6}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: '14px',
//                 color: '#757575',
//                 display: 'flex',
//                 alignItems: 'center',
//                 mb: 1
//               }}
//             >
//               <WcIcon sx={{ fontSize: 16, marginRight: 1 }} />
//               Gender:{' '}
//               <span style={{ fontWeight: 'bold', color: '#000', marginLeft: 4 }}>
//                 {profile.gender}
//               </span>
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: '14px',
//                 color: '#757575',
//                 display: 'flex',
//                 alignItems: 'center',
//                 mb: 1
//               }}
//             >
//               <PublicIcon sx={{ fontSize: 16, marginRight: 1 }} />
//               Country:{' '}
//               <span style={{ fontWeight: 'bold', color: '#000', marginLeft: 4 }}>
//                 {profile.country}
//               </span>
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: '14px',
//                 color: '#757575',
//                 display: 'flex',
//                 alignItems: 'center',
//                 mb: 1
//               }}
//             >
//               <PhoneIcon sx={{ fontSize: 16, marginRight: 1 }} />
//               Mobile:{' '}
//               <span style={{ fontWeight: 'bold', color: '#000', marginLeft: 4 }}>
//                 {profile.phone}
//               </span>
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: '14px',
//                 color: '#757575',
//                 display: 'flex',
//                 alignItems: 'center',
//                 mb: 1
//               }}
//             >
//               <EmailIcon sx={{ fontSize: 16, marginRight: 1 }} />
//               Email:{' '}
//               <span style={{ fontWeight: 'bold', color: '#000', marginLeft: 4 }}>
//                 {user?.email || 'Not available'}
//               </span>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default PatientCard;










import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import WcIcon from '@mui/icons-material/Wc';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import AWSCognitoContext from 'src/contexts/AWSCognitoContext';
import { useNavigate } from 'react-router-dom';
import { CallCalling, Gps, Sms } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import profileImage from 'assets/images/landingImages/LandingImagess2/CaregivingandSibling.png';
import BackgroundImage from 'assets/images/dashboard/BackgroundProfile.jpg';

const PatientCard = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md')); // Detect mobile views
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Detect tablet views
    const matchDownXL = useMediaQuery((theme) => theme.breakpoints.down('xl','lg')); 
  const navigate = useNavigate();
  const { user } = useContext(AWSCognitoContext); // Get email from Cognito context
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    zipCode: '',
    address: '',
    Age: '',
    gender: '',
    height: '',
    weight: '',
    goals: '',
    exercisePreferences: ''
  });

  const handleViewProfile = () => {
    navigate('/apps/profiles/account/basic');
  };

  const dynamoDbClient = new DynamoDBClient({
    region: 'us-west-2',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  });

  const fetchUserDataFromDynamoDB = async (email) => {
    const params = {
      TableName: 'Register_Data',
      Key: {
        email: { S: email }
      }
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
          zipCode: data.Item.zipCode?.S || '',
          address: data.Item.address?.S || '',
          Age: data.Item.Age?.S || '',
          gender: data.Item.gender?.S || '',
          height: data.Item.height?.S || '',
          weight: data.Item.weight?.S || '',
          goals: data.Item.goals?.S || '',
          exercisePreferences: data.Item.exercisePreferences?.S || ''
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
            ...userData
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
          backgroundSize: 'cover', // Ensures the image covers the entire box
          backgroundPosition: 'center', // Centers the image within the box
          padding: '20px',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '76.5vw', // Responsive width
          height: '40vh', // Responsive height
          margin: 'auto',
          marginTop: theme => theme.spacing(5), // Dynamic spacing
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for a polished look
          marginRight:'40px',
        }}
      >
      {/* Left Section: Avatar and Profile Button */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '25%'
        }}
      >
        <Box
          component="img"
          src={profileImage}
          alt="Avatar"
          sx={{
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            marginLeft: 5
          }}
        />
      </Box>

      {/* Middle Section: Name and Title */}
      <Box sx={{ width: '35%' }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: '16px',
            color: '#000',
            marginBottom: '5px'
          }}
        >
          Dyadic Health
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000'
          }}
        >
          {`${profile.firstName} ${profile.lastName}`}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ECEDF3',
            color: '#000',
            marginTop: '10px',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'none',
            ':hover': { backgroundColor: '#fcd89f' }
          }}
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </Box>

      {/* Right Section: Patient Info */}
      <Box
        sx={{
          width: '65%', // Adjust width to fit better with other sections
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around', // Spread items evenly
          alignItems: 'flex-start', // Align content to the start for consistency
          padding: '10px 20px', // Add padding for better spacing
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Subtle background for contrast
          borderRadius: '10px', // Rounded corners for a clean look
          height: '20vh',
        }}
      >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ListItemIcon>
                <Sms size={18} />
              </ListItemIcon>
              <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1 }}>
                Email
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="right"
                sx={{ fontWeight: 'bold' }}
              >
                {user?.email || 'Not available'}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CallCalling size={18} />
              </ListItemIcon>
              <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1 }}>
                Phone
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="right"
                sx={{ fontWeight: 'bold' }}
              >
                {profile.phone || 'N/A'}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Gps size={18} />
              </ListItemIcon>
              <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1 }}>
                Country
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="right"
                sx={{ fontWeight: 'bold' }}
              >
                {profile.country || 'N/A'}
              </Typography>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default PatientCard;
