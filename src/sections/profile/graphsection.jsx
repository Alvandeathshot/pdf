import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraphSection() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Articles',
        data: [10, 15, 20, 30, 25, 40],
        fill: false,
        borderColor: 'blue',
      },
      {
        label: 'Videos',
        data: [5, 10, 15, 20, 10, 25],
        fill: false,
        borderColor: 'green',
      },
      {
        label: 'Activities',
        data: [2, 4, 6, 8, 10, 12],
        fill: false,
        borderColor: 'red',
      }
    ]
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Graphical Representation</Typography>
          <Line data={data} />
        </Paper>
      </Grid>
    </Grid>
  );
}