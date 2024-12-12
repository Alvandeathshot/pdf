import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  Box,
  Slider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { Favorite, ChildCare, People } from '@mui/icons-material';

const Bubble = styled('div')(({ theme, selected }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  margin: '10px',
  borderRadius: '50%',
  background: selected
    ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
    : theme.palette.grey[300],
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  boxShadow: selected ? '0px 8px 20px rgba(0, 0, 0, 0.4)' : '0px 4px 10px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
  },
  '& > svg': {
    marginRight: '8px',
  },
}));

const icons = {
  Intimate: <Favorite />,
  Parental: <ChildCare />,
  Others: <People />,
};

const Trainingrelation = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [dhiResponses, setDhiResponses] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [finalOutputs, setFinalOutputs] = useState({}); // To store the final outputs for each question

  // Fetch questions from the backend and reset questions state for each type
  const fetchQuestions = async (type) => {
    try {
      const response = await fetch(`https://hcdhhsqyei.execute-api.us-west-2.amazonaws.com/dev/questions?relationshipType=${type}`);
      const data = await response.json();
      setQuestions(data); // Reset questions state with new questions
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleBubbleClick = (type) => {
    setSelectedTypes([type]); // Only allow one relationship type to be selected at a time
    fetchQuestions(type); // Fetch questions when a new type is selected
  };

  const handleDhiChange = (questionId, value) => {
    const updatedResponses = { ...dhiResponses, [questionId]: value };
    setDhiResponses(updatedResponses);
  };

  const generateReport = () => {
    // Generate the final report based on selected ratings and questions
    const reportData = questions.map((question) => {
      const rating = dhiResponses[question.QuestionID];
      if (rating) {
        return {
          question: question.QuestionText,
          rating: rating,
          finalOutput: question.FinalOutput, // Assuming this contains the correct final outputs
        };
      }
      return null;
    }).filter(q => q !== null);
    
    setFinalOutputs(reportData);
    setShowReport(true);
  };

  return (
    <Grid container spacing={4} sx={{ height: '50vh' }}>
      {/* Left container for relationship types */}
      <Grid item xs={12} md={6} sx={{ height: '100%' }}>
        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Select Relationship Type
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {['Intimate', 'Parental', 'Others'].map((type) => (
                <Grid item key={type}>
                  <Bubble selected={selectedTypes.includes(type)} onClick={() => handleBubbleClick(type)}>
                    {icons[type]}
                    {type}
                  </Bubble>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Button variant="contained" color="primary" onClick={generateReport}>
            View Report
          </Button>
        </Paper>
      </Grid>

      {/* Right container for questions */}
      <Grid item xs={12} md={6} sx={{ height: '100%', overflowY: 'auto' }}>
        <Paper elevation={3} sx={{ p: 3, height: '100%', paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            {selectedTypes.length === 0
              ? 'Select a relationship type to start answering questions.'
              : 'Questions'}
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {questions.map((question) => (
              <FormControl component="fieldset" sx={{ mb: 2 }} key={question.QuestionID} fullWidth>
                <FormLabel component="legend" sx={{ wordWrap: 'break-word', marginBottom: '8px' }}>
                  {question.QuestionText}
                </FormLabel>
                <Slider
                  value={dhiResponses[question.QuestionID] || 1}
                  min={1}
                  max={5}
                  step={1}
                  marks={[
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                  ]}
                  valueLabelDisplay="auto"
                  sx={{ width: '70%', marginLeft: '20px' }}
                  onChange={(e, newValue) => handleDhiChange(question.QuestionID, newValue)}
                />
              </FormControl>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* Dialog for displaying the report */}
      <Dialog
        open={showReport}
        onClose={() => setShowReport(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Generated Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here's the report based on the ratings you've provided for each relationship type:
          </DialogContentText>
          {finalOutputs.length > 0 && finalOutputs.map((output, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="h6">{output.question}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Your Rating:</strong> {output.rating}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
                <strong>Final Output:</strong> {output.finalOutput}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReport(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Trainingrelation;
