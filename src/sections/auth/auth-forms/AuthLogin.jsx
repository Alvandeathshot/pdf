import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

export default function AuthLogin({ forgot }) {
  const navigation = useNavigate();
  const scriptedRef = useScriptRef();

  const { login, newPasswordRequired, newPasswordCallback } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [verification, setVerification] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {newPasswordRequired ? (
        <Formik
        initialValues={{
          newPassword: '', // Always start with a default value
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters') // Minimum length
            .required('New password is required'), // Field is required
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await newPasswordCallback(values.newPassword); // Call the callback for new password
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              console.error('Error during new password submission:', err);
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.newPassword || ''} // Default empty string
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />


                </Stack>
                {touched.newPassword && errors.newPassword && (
                  <FormHelperText error id="helper-text-new-password">
                    {errors.newPassword}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                <Button
                    // disableElevation
                    // disabled={
                    //   isSubmitting || // Disable during form submission
                    //   !values.newPassword  // Disable if password is empty
                    //   // Boolean(errors.newPassword) // Disable if there are validation errors
                    // }
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Update Password
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      
      ) : (
        <Formik
          initialValues={{
            email: '',
            password: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await login(values.email, values.password);
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                console.error('Error during login:', err);
                if (err.code && err.code === 'UserNotConfirmedException') {
                  setVerification(true);
                }
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
            console.log({
              isSubmitting,
              values,
              errors,
              touched,
            });

            return (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                    </Stack>
                    {touched.email && errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        id="password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="secondary"
                            >
                              {showPassword ? <Eye /> : <EyeSlash />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                      />
                    </Stack>
                    {touched.password && errors.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography variant="h6">Keep me sign in</Typography>}
                      />
                      <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                        Forgot Password?
                      </Link>
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>
                        {errors.submit}{' '}
                        {verification && (
                          <>
                            <Link href="#" onClick={verificationHandler} color="error" sx={{ fontWeight: 700 }}>
                              Click me
                            </Link>{' '}
                            for user verification
                          </>
                        )}
                      </FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}
