import React, { useContext } from 'react';
import { Grid, Container, Typography  } from '@mui/material';

import Insights from 'sections/profile/insights';

export default function Features() {
  

  return (
    <>
    {/* Single Grid Item containing all other sections */}
    <Grid item xs={12}>
        <Insights/>
    </Grid>
    </>
  );
}
