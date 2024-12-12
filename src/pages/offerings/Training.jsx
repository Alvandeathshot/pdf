import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// project imports
import Trainingheader from 'sections/extra-pages/Training/Trainingheader';
import Trainingrelation from 'sections/extra-pages/Training/Trainingrelation';

// ==============================|| training page ||============================== //

export default function Training() {
  return (
    <Container sx={{ mb: 12 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Trainingheader />
        </Grid>

        <Grid item xs={12} >
          {<Trainingrelation /> }
        </Grid>
      </Grid>
    </Container>
  );
}
