import React, { useEffect, useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Snackbar, Alert } from '@mui/material';
import AWSCognitoContext from 'contexts/AWSCognitoContext'; // import context for user info
import { useNavigate } from 'react-router-dom';

// Other imports...
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';
import { ArrowUp, ArrowDown, Wallet3, Book, Calendar, CloudChange } from 'iconsax-react';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const { user, isProfileComplete } = useContext(AWSCognitoContext);
  const [openNotification, setOpenNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if profile is incomplete and show notification
    if (!isProfileComplete) {
      setOpenNotification(true);
    }
  }, [isProfileComplete]);

  const handleCloseNotification = () => {
    setOpenNotification(false);
    navigate('/hello/profiles/user/personal'); // Navigate to the profile completion page when the user clicks on the notification
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Snackbar
        open={openNotification}
        onClose={handleCloseNotification}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity="info" sx={{ width: '100%' }}>
          Please complete your profile.
        </Alert>
      </Snackbar>

      {/* Add your other grid items here */}
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="All Earnings"
          count="$3000"
          iconPrimary={<Wallet3 />}
          percentage={
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color="primary" />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Page Views"
          count="290+"
          color="warning"
          iconPrimary={<Book color={theme.palette.warning.dark} />}
          percentage={
            <Typography color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.warning.dark} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Total task"
          count="1,568"
          color="success"
          iconPrimary={<Calendar color={theme.palette.success.darker} />}
          percentage={
            <Typography color="success.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.success.darker} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Download"
          count="$200"
          color="error"
          iconPrimary={<CloudChange color={theme.palette.error.dark} />}
          percentage={
            <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.error.dark} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} md={8} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RepeatCustomerRate />
          </Grid>
          <Grid item xs={12}>
            <ProjectOverview />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={3}>
          <ProjectRelease />
          <AssignUsers />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Transactions />
      </Grid>

      <Grid item xs={12} md={6}>
        <TotalIncome />
      </Grid>
    </Grid>
  );
}
