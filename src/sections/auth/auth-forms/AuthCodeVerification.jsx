import { useNavigate, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

// Third party
import OtpInput from 'react18-input-otp';
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';

import { ThemeMode } from 'config';
import { openSnackbar } from 'api/snackbar';

// assets
import { Warning2 } from 'iconsax-react';

// Utility function to mask email
const maskEmail = (email) => {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  const maskedLocalPart = localPart.length > 2 ? `${localPart[0]}****${localPart.slice(-1)}` : localPart;
  return `${maskedLocalPart}@${domain}`;
};

export default function AuthCodeVerification() {
  const { codeVerification, resendConfirmationCode } = useAuth();
  const scriptedRef = useScriptRef();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();  // Use location to retrieve email passed via navigate

  // Retrieve email from location state or localStorage
  const email = location?.state?.email || localStorage.getItem('email');
  const maskedEmail = maskEmail(email);  // Mask the email

  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;

  return (
    <Formik
      initialValues={{
        otp: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        otp: Yup.string().length(6, 'OTP should be 6 digits').required('Verification Code is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (!email) {
            setErrors({ submit: 'Email is missing, cannot verify the account.' });
            return;
          }

          // Verify the code with AWS Cognito
          await codeVerification(email, values.otp)
            .then(() => {
              setSubmitting(false);
              openSnackbar({
                open: true,
                message: 'Account verified successfully.',
                variant: 'alert',
                alert: { color: 'success' }
              });
              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            })
            .catch((err) => {
              setStatus({ success: false });
              setErrors({ submit: err?.message || JSON.stringify(err) });
              setSubmitting(false);
            });
        } catch (err) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleSubmit, touched, values, setFieldValue, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Enter Verification Code</Typography>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="verification-code">Enter Verification Code</InputLabel>
                <OtpInput
                  value={values.otp}
                  onChange={(otp) => setFieldValue('otp', otp)}
                  numInputs={6}
                  isInputNum
                  containerStyle={{ justifyContent: 'space-between' }}
                  inputStyle={{
                    width: '100%',
                    margin: '4px',
                    padding: '16px',
                    border: '1px solid ',
                    borderColor: borderColor,
                    borderRadius: 4,
                    ':hover': {
                      borderColor: theme.palette.primary.main
                    }
                  }}
                  focusStyle={{
                    outline: 'none',
                    boxShadow: theme.customShadows.primary,
                    border: '1px solid',
                    borderColor: theme.palette.primary.main
                  }}
                />
              </Stack>
              {touched.otp && errors.otp && (
                <FormHelperText error id="helper-text-otp">
                  {errors.otp}
                </FormHelperText>
              )}
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <Alert color="error" variant="border" icon={<Warning2 variant="Bold" color={theme.palette.error.main} />}>
                  {errors.submit}
                </Alert>
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
                  Verify Account
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography>Did not receive the email? Check your spam folder or</Typography>
                <Typography
                  onClick={() => resendConfirmationCode(email)} // Ensure email is passed
                  variant="body1"
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  color="primary"
                >
                  Resend code
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
