import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Button, Link, Container, CardMedia, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './Animation'; // Assuming this is a custom animation component
import MainCard from 'components/MainCard'; // Custom card component
import { DocumentDownload, ExportSquare } from 'iconsax-react'; // Import icons as needed

// Dummy Icons (replace these with your actual icon paths)
import breath from 'assets/images/landing/breath.svg';
import posture from 'assets/images/landing/posture.svg';
import workout from 'assets/images/landing/workout.svg';
import foundation from 'assets/images/landing/foundation.svg';
import diet from 'assets/images/landing/diet.svg';
import recovery from 'assets/images/landing/recovery.svg';

// Dummy Data for Technologies
const Technologies = [
  {
    trending: false,
    icon: foundation,
    title: 'Introduction',
    description: 'Blending the physical health of a self into the realm of dyadic relationships.',
    route: '/Introduction',
    free: true
  },
  {
    trending: false,
    icon: breath,
    title: 'Breathing',
    description: 'Emotional regulation through improvement of breathing patterns & respiratory health.',
    route: '/Foundation',
    free: false
  },
  {
    trending: false,
    icon: posture,
    title: 'Posture',
    description: 'Quality interactions within Dyads through improvement of energy and emotional aspects.',
    route: '/posture',
    free: false
  },
  {
    trending: false,
    icon: diet,
    title: 'Diet',
    description: 'Nutrient-rich foods reduce stress and increase emotional stability, leading to fewer conflicts.',
    route: '/diet',
    free: false
  },
  {
    trending: false,
    icon: workout,
    title: 'Workouts',
    description: 'Strengthen dyadic relationships by promoting shared activities and mutual support.',
    route: '/workout',
    free: false
  },
  {
    trending: false,
    icon: recovery,
    title: 'Recovery',
    description: 'Enhance dyadic relationships by promoting shared relaxation and recovery activities.',
    route: '/recovery',
    free: false
  }
];

// Main Component
const TechnologiesPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '70vh', padding: 3 }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 1, xs: 2.5 }, mb: { md: 1, xs: 2.5 } }}>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <motion.div initial={{ opacity: 0, translateY: 550 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}>
                  <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#37474f' }}>Strengthen Your Personal Foundation</Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div initial={{ opacity: 0, translateY: 550 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}>
                  <Typography sx={{ color: '#607d8b' }}>Activities that help strengthen your personal foundation in Dyadic Health</Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              {Technologies.map((tech, index) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                      }}
                    >
                      <FadeInWhenVisible>
                        <MainCard sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  width: 100,  // Set the width for the container
                                  height: 100, // Set the height for the container
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  image={tech.icon}
                                  sx={{
                                    width: '80%', // Make sure the icon fits within the container
                                    height: '80%',
                                    objectFit: 'contain', // Ensure the icon maintains its aspect ratio
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#37474f' }}>
                                {tech.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography sx={{ color: '#607d8b' }}>{tech.description}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={2} justifyContent="flex-start">
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    startIcon={<ExportSquare />} // Always show the ExportSquare icon
                                    component={RouterLink}
                                    to={tech.route}
                                    sx={{
                                      fontWeight: 500,
                                      bgcolor: 'secondary.light',
                                      color: 'secondary.darker',
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        color: 'secondary.lighter',
                                        transform: 'translateY(-2px)',
                                      },
                                    }}
                                  >
                                    Start
                                  </Button>
                                </Grid>
                                {tech.free && (
                                  <Grid item>
                                    <Link component={RouterLink} to={tech.route}>
                                      <IconButton
                                        size="large"
                                        shape="rounded"
                                        color="secondary"
                                        sx={{
                                          bgcolor: 'secondary.lighter',
                                          color: 'secondary.darker',
                                          transition: 'all 0.3s ease',
                                          '&:hover': {
                                            color: 'secondary.lighter',
                                            bgcolor: 'secondary.darker',
                                            transform: 'translateY(-2px)',
                                          }
                                        }}
                                      >
                                        <DocumentDownload />
                                      </IconButton>
                                    </Link>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </MainCard>
                      </FadeInWhenVisible>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TechnologiesPage;