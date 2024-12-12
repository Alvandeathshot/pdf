import React, { useContext } from 'react';
import { Grid, Container, Typography  } from '@mui/material';
import ProfileHeader from 'sections/profile/profileheader';
import TechnologiesSection from 'sections/profile/TechnologiesSection';
import AWSCognitoContext from 'src/contexts/AWSCognitoContext';
import { Link } from 'react-router-dom';
import DyadContainers from 'sections/profile/DyadContainers';
import NewDashboard from 'src/pages/profile/new.jsx';


//sections
import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';
import UserDetails from 'sections/profile/userdetails';
import UserDetailsIdea from 'sections/profile/userdetailsidea';
import UserDetailsIdea3 from 'sections/profile/userdetailsidea3';
import Insights from 'sections/profile/insights';
import Dash from 'sections/profile/dash';
import GraphSection from 'sections/profile/graphsection';
import DiscussionBoard from 'sections/profile/Discusscus';
import QuoteOfDay from 'sections/profile/Quotesection';

export default function ProfileMainPage() {

  const { user } = useContext(AWSCognitoContext);
  
  // Profile data state (You might need to fetch or pass this down)
  const profile = {
    firstName: '',  
    lastName: '',   
    phone: '',  
    zipCode: '',
    Age: '', 
    address: '',  
    gender: '', 
    height: '',  
    weight: '',   
    goals: '', 
    exercisePreferences: '',
  };

  // Function to check if all required fields are filled
  const isProfileIncomplete = () => {
    const requiredFields = ['firstName', 'lastName', 'Age', 'address', 'gender', 'height', 'weight'];
    return requiredFields.some((field) => !profile[field]);
  };

  return (
    <>
   
        {/* Top Grid for Profile Header */}
        {/* <Grid item xs={5}>
          <WelcomeBanner />
        </Grid> */}
        
        <Grid>
          {/* Scrolling Text Notification using <marquee> */}
          {isProfileIncomplete() && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <marquee behavior="scroll" direction="left" scrollamount="6">
                <Typography variant="h6" color="error">
                  Please complete your profile to get a better user experience! 
                  <span style={{ textDecoration: 'underline', marginLeft: '10px', cursor: 'pointer' }}>
                    <Link to="/hello/profiles/account/basic" style={{ color: '#721c24', textDecoration: 'underline' }}>
                    click here to complete
                    </Link>
                    </span>
                    </Typography>
              </marquee>
            </div>
          )}
        </Grid>
        <Grid item xs={5}>
          <WelcomeBanner />
          {/* <UserDetailsIdea />
          <UserDetailsIdea3 /> */}
        </Grid>
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 3, md: 5 } }}>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 6 }}
      >

        {/* Single Grid Item containing all other sections */}
        <Grid item xs={12}>
          {/* <TechnologiesSection /> */}
          {/* <UserDetailsIdea /> */}
          {/* <UserDetails /> */}
          <Dash />
          <Insights/>
           {/* <DyadContainers />  */}
           <GraphSection /> 
           <DiscussionBoard />
          {/* <NewDashboard/> */}
          <QuoteOfDay />
        </Grid>
      </Grid>
    </Container>
    </>
  );
}
