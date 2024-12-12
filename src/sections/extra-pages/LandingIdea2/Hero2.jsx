import React from 'react';
import { Box, Typography } from '@mui/material';
import Hero from 'sections/landing/Header';

const TextAndImageLayout = () => {
  return (
    <Box display="flex" width="100%" height="70vh" 
    sx={{
        backgroundColor: '#ECEDF3', mt:10
        }}
    >
      <Hero />
    </Box>
  );
};

export default TextAndImageLayout;
