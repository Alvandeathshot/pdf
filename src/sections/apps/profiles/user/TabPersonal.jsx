import { useContext, useState, useEffect } from 'react';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'; // Import required AWS SDK classes

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import MainCard from 'components/MainCard';
import countries from 'data/countries';
import { openSnackbar } from 'api/snackbar';
import AWSCognitoContext from 'contexts/AWSCognitoContext'; // Import the AWS Cognito context

// Function to update user data in DynamoDB
const updateUserInDynamoDB = async (email, profileData) => {
  try {
    const dynamoDbClient = new DynamoDBClient({ region: 'us-west-2' }); // Create DynamoDB client instance

    const params = {
      TableName: 'Register_Data',
      Key: { email: { S: email } },
      UpdateExpression: 'set firstName = :fn, lastName = :ln, contact = :ct, address = :ad, country = :cn, state = :st',
      ExpressionAttributeValues: {
        ':fn': { S: profileData.firstname },
        ':ln': { S: profileData.lastname },
        ':ct': { S: profileData.contact },
        ':ad': { S: profileData.address },
        ':cn': { S: profileData.country },
        ':st': { S: profileData.state }
      },
      ReturnValues: 'UPDATED_NEW'
    };

    // Send the update request to DynamoDB
    await dynamoDbClient.send(new UpdateItemCommand(params));

  } catch (error) {
    console.error('Error updating profile in DynamoDB:', error);
    throw error;
  }
};

export default function TabPersonal() {
  const { user } = useContext(AWSCognitoContext); // Get data from the AWS Cognito context
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    contact: '',
    address: '',
    state: ''
  });

  useEffect(() => {
    if (user) {
      // Populate initial values from the AWS Cognito context data
      setInitialValues({
        firstname: user.firstName || '',
        lastname: user.lastName || '',
        email: user.email || '',
        country: user.country || '',
        contact: user.contact || '',
        address: user.address || '',
        state: user.state || ''
      });
    }
  }, [user]);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string().required('Contact is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateUserInDynamoDB(user.email, values); // Update DynamoDB
      openSnackbar({
        open: true,
        message: 'Profile updated successfully',
        variant: 'alert',
        alert: { color: 'success' }
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      openSnackbar({
        open: true,
        message: 'Error updating profile',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainCard content={false} title="Personal Information">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstname"
                      value={values.firstname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.firstname && errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastname"
                      value={values.lastname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.lastname && errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      fullWidth
                      label="Contact"
                      name="contact"
                      value={values.contact}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.contact && errors.contact)}
                      helperText={touched.contact && errors.contact}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="country"
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    value={countries.find((country) => country.code === values.country) || null}
                    onChange={(event, newValue) =>
                      handleChange({
                        target: {
                          name: 'country',
                          value: newValue?.code || ''
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={values.state}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ p: 2.5, textAlign: 'right' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
