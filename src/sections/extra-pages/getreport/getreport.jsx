import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function GetReport({ markComplete, userDetails, setUserDetails }) {
  const [formData, setFormData] = useState({
    fullName: userDetails.fullName || '',
    email: userDetails.email || '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // As soon as form data is filled, update the parent component state
    setUserDetails({
      fullName: formData.fullName,
      email: formData.email,
    });
  }, [formData, setUserDetails]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number) => {
    return number && number.length >= 10 && number.length <= 15; // Adjust for country codes
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
        background: 'linear-gradient(to bottom right, #f0f4f8, #e0e7ff)',
        boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 4, fontWeight: 'bold', color: '#37474f' }}
      >
        Get Your Personalized Report
      </Typography>
      <Grid container spacing={3}>
        {/* Full Name */}
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
            }}
          />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <PhoneInput
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(value) => handleChange('phoneNumber', value)}
              defaultCountry="US"
              style={{
                padding: '10px',
                border: errors.phoneNumber
                  ? '1px solid #d32f2f'
                  : '1px solid #cfd8dc',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
              }}
            />
            {errors.phoneNumber && (
              <Typography variant="caption" color="error">
                {errors.phoneNumber}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
