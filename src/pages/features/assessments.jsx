import React, { useContext } from 'react';
import { Grid, Container, Typography  } from '@mui/material';

import Exercise from 'src/sections/extra-pages/preassessment/exercise.jsx';

export default function Features() {
  

  return (
    <>
    {/* Single Grid Item containing all other sections */}
    <Grid item xs={12}>
        <Exercise />
    </Grid>
    </>
  );
}
