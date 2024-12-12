import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link for internal navigation

// Material-UI components
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Custom component
import FadeInWhenVisible from './Animation'; // Ensure you have this file

// Technologies array (without the content inside it)
const Technologies = [
  {
    title: 'Dyadic Relationship',
    category: 'parenting',
    description: 'All Dyadic relationships have an interdependence. Targeted activities focus on interconnectedness.'
  },
  {
    title: 'Spousal Dyad',
    category: 'spousal_relationships',
    description: "It fosters unity, empathy, intimacy, and shared values. Targeted activities focus on each partner's health."
  },
  {
    title: 'Parental Dyad',
    category: 'family',
    description: 'It fosters guidance, security, and loving bond with a child. Targeted activities focus on being a balanced parent.'
  },
  {
    title: 'Other Common Dyads',
    category: 'quality_relationships',
    description: 'On Average, we have several dyadic relationships. Targeted activities focus on collaborating effectively.'
  }
];

// Content mapping that holds the detailed content for each category
const contentMapping = {
  parenting: `
    Let's start the conversation with the understanding that you are aware of Dyadic Health as the health of the pair (two) people in a relationship and various types of such Dyadic relationships exist.
    <br><br>
    There are some attributes that define any type of Dyadic relationship. Those are Communication, Empathy, Trust, Security, and so on.
    <br><br>
    "Knowing how we are doing on these attributes will give us an idea about how our dyadic relationships are."Dyadic Health Training WorkShops will be available soon..."
  `,
  spousal_relationships: `
    Let's start the conversation with the understanding that spousal relationships, though inherently intimate, encompass much more. The strength of the spousal connection directly influences each partner's health and well-being.
    <br>
    There are some common challenges that couples face in maintaining this connection. These challenges include communication difficulties in expressing needs, feelings, and expectations, emotional and mental health issues such as stress, anxiety, and depression, and coping with chronic illnesses or disabilities of a partner.
    <br>
    Knowing how we address these challenges will help prioritize quality time, encourage support, and promote healthy habits together.
  `,
  family: `
    Let's start the conversation with the understanding that a parent-child relationship is one of the most comprehensive dyadic relationships, where many elements of guidance, security, and love are naturally implied.
    <br>
    There are some common challenges that parents face in this relationship. These challenges include maintaining healthy communication, providing consistent support, managing expectations, and fostering a nurturing environment.
    <br>
    Knowing how we address these challenges will help lead by example, promote family wellness activities, and create an open and supportive environment for mutual growth and fulfillment.
  `,
  quality_relationships: `
    Let's start the conversation with the understanding that nurturing and preserving the quality of relationships has tremendous health benefits for both individuals involved in any dyadic relationship.
    <br>
    There are some common challenges that people face in various dyadic relationships. These challenges include respecting personal boundaries and preferences, encouraging personal growth, collaborating effectively, and addressing conflicts constructively.
    <br>
    Knowing how we address these challenges will help improve communication, promote personal development, and use physical activities to strengthen the relationship for mutual growth and fulfillment.
  `,
};

// SelectedInfo component for displaying the content in the white box
const SelectedInfo = ({ title, content, linkText, titleSize, contentSize, linkSize, containerHeight }) => (
  <Box
    sx={{
      mt: { xs: 1, md: 0 },
      width: '100%',
      p: 3,
      backgroundColor: 'white',
      borderRadius: 2, // Slightly more rounded corners
      color: 'text.primary',
      height: containerHeight || '600px', // Default height
      overflowY: 'auto',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      transition: 'all 0.3s ease', // Smooth transition for any changes
      '&:hover': {
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)', // Slightly larger shadow on hover
      }
    }}
  >
    <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: titleSize || 'inherit', color: 'primary.main' }}>
      {title}
    </Typography>
    {/* Use dangerouslySetInnerHTML to render HTML content */}
    <Typography
      sx={{ whiteSpace: 'pre-line', fontSize: contentSize || 'inherit', mb: 3 }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
    {/* <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/Training"
        sx={{
          fontSize: linkSize || 'inherit',
          padding: '10px 30px', // Wider padding for a more substantial button
          borderRadius: '50px', // Fully rounded button
          textTransform: 'none',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)', // Shadow for depth
          '&:hover': {
            backgroundColor: alpha('#1976d2', 0.9), // Darker shade on hover
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)', // Larger shadow on hover
          },
        }}
      >
        {linkText}
      </Button>
    </Box> */}
  </Box>
);

// TechButton component for each technology option
const TechButton = ({ tech, index, handleClick, selected }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12}>
      <FadeInWhenVisible>
        <Button
          onClick={() => handleClick(index)}
          sx={{
            p: 3,
            borderRadius: 1.5,
            ...(selected && {
              background: alpha(theme.palette.secondary.lighter, 0.13),
              boxShadow: theme.customShadows.z1,
              '&:hover': { background: alpha(theme.palette.secondary.lighter, 0.13), boxShadow: theme.customShadows.z1 }
            })
          }}
          variant="light"
        >
          <Grid container textAlign="start" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="white" sx={{ textTransform: 'none' }}>
                {tech.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="white" style={{ whiteSpace: 'pre-line', textTransform: 'none' }}>
                {tech.description}
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </FadeInWhenVisible>
    </Grid>
  );
};

// Main AppsPage component
export default function AppsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0); // Manage selected index

  const handleClick = (index) => {
    setSelectedIndex(index); // Set the clicked index as the selected index
  };

  // Get the selected technology
  const selectedTech = Technologies[selectedIndex];

  // Get the content from the content mapping
  const selectedContent = contentMapping[selectedTech.category];

  return (
    <Box sx={{ bgcolor: 'primary.main', overflow: 'hidden', pt: { md: 10, xs: 5 }, position: 'relative' }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  Dyadic Health Improvement
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Engaging in activities that help enhance the Health of a Dyadic Relationship
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ pt: { md: 10, xs: 2.5 } }}>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="start">
              {/* Left side with the list of options */}
              <Grid item xs={12} md={6}>
                <Box pb={{ xs: 0, md: 10 }}>
                  <Grid container spacing={1.5} alignItems="center">
                    {Technologies.map((tech, index) => (
                      <TechButton
                        key={index}
                        tech={tech}
                        index={index}
                        handleClick={handleClick}
                        selected={selectedIndex === index}
                      />
                    ))}
                  </Grid>
                </Box>
              </Grid>
              {/* Right side with the selected information */}
              <Grid item xs={12} md={6}>
                <SelectedInfo
                  title={selectedTech.title}
                  content={selectedContent}
                  linkText="Let's start a self evaluation"
                  titleSize="2.5rem" // Adjust title font size as needed
                  contentSize="1rem" // Adjust content font size as needed
                  linkSize="1rem" // Adjust link text font size as needed
                  containerHeight="575px" // Adjust container height as needed
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
