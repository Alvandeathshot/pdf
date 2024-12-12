import React, { useContext } from 'react';
import { Grid, Container, Typography  } from '@mui/material';

import Articles from 'pages/Articles';

export default function Features() {
  

  return (
    <>
    {/* Single Grid Item containing all other sections */}
    <Grid item xs={12}>
        <Articles/>
    </Grid>
    </>
  );
}
