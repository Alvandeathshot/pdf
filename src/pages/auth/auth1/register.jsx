// Updated Register.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// project-imports
import Logo from 'components/logo';
import useAuth from 'hooks/useAuth';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthRegister from 'sections/auth/auth-forms/AuthRegister'; // Use AuthRegister instead of FirebaseRegister

// assets
import imgFacebook from 'assets/images/auth/facebook.svg';
import imgTwitter from 'assets/images/auth/twitter.svg';
import imgGoogle from 'assets/images/auth/google.svg';

export default function Register() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AuthWrapper>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgFacebook} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Facebook
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgTwitter} alt="Twitter" style={{ margin: '0 10px' }} /> Sign In with Twitter
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgGoogle} alt="Google" style={{ margin: '0 10px' }} /> Sign In with Google
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Sign up</Typography>
          <Typography
            component={Link}
            to={isLoggedIn ? '/auth/login' : '/login'}
            variant="body1"
            sx={{ textDecoration: 'none' }}
            color="primary"
          >
            Already have an account?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister /> {/* Using AuthRegister directly */}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
