import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LeftContainer = () => {
  const LinkStyled = ({ to, children }) => (
    <Link
      to={to}
      style={{
        textDecoration: 'underline',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#1976d2',
      }}
    >
      {children}
    </Link>
  );

  return (
    <Grid item xs={12} md={6}>
      {/* <Card elevation={3} sx={{ padding: '20px' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography paragraph variant="h2">
              Foundation
            </Typography>
            <Typography paragraph>
              Breathing techniques like Proper breathing help improve physical health benefits, stamina, and energy for physical activities, while Controlled breathing helps with benefits to emotional health through the reduction of negative emotions. Usage of parameters such as resting bpm, VO2 max, and HRV stress can help us analyze our breathing health.
              <LinkStyled to="/Foundation">
                &nbsp;Start working on Breathing Foundation
              </LinkStyled>
            </Typography>
            <Typography paragraph>
              Good posture has an effect on both physical and mental aspects, reducing strain on muscles, preventing injuries, improving respiratory efficiency, mood enhancement, and improved self-perception. Several posture problems like lordosis, kyphosis, flat back, sway back, and scoliosis exist. Identifying the exact posture problem will help fix it.
              <LinkStyled to="/posture">
                &nbsp;Start working on posture correction
              </LinkStyled>
            </Typography>
            <Typography paragraph>
              A balanced diet that comprises various food items in the right proportions helps with physical vitality and brain health. Assessing current dietary habits and developing good habits to consciously chew, digest, absorb, and assimilate the nutrients is essential, while maintaining a good routine and quiet mind.
              <LinkStyled to="/diet">
                &nbsp;Let's start working on diet.
              </LinkStyled>
            </Typography>
            <Typography paragraph>
              Various types of workouts help strengthen muscles, improve cardiovascular function, boost overall stamina, reduce stress and anxiety, and enhance mood and energy. A good combination of cardio, resistance, and stretching activities helps get a balanced workout benefit.
              <LinkStyled to="/workout">
                &nbsp;Start on workouts
              </LinkStyled>
            </Typography>
            <Typography paragraph>
              Proper recovery with adequate sleep, rest days, and relaxation techniques helps with muscle repair and emotional regulation. Identifying the current state of body recovery and sleep patterns will help to put them back on track for a complete foundation cycle.
              <LinkStyled to="/recovery">
                &nbsp;Start working on recovery
              </LinkStyled>
            </Typography>
            <Typography paragraph>
              When individuals optimize their breathing, posture, diet, exercise, and recovery, they create a strong foundation for physical and mental well-being. In a dyadic context, these factors help in establishing better understanding, empathy, and cooperation. Foundational health practices synchronize both individuals, which strengthens emotional and physical bonds, enabling them to thrive together.
            </Typography>
          </Box>
        </CardContent>
      </Card> */}
    </Grid>
  );
};

export default LeftContainer;
