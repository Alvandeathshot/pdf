import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import MainCard from 'components/MainCard';
import DyadContainers from 'sections/profile/DyadContainers';
import DoneIcon from '@mui/icons-material/CheckCircle';
import TodoIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function Insights() {
  const initialTasksToDo = ['Training', 'Breathing exercises', 'Workouts','Posture improvement', 'Diet plan', 'Recovery sessions', 'Read articles', 'Watch videos'];

  const taskLinks = {
    'Training': '/Introduction',
    'Breathing exercises': '/Foundation',
    'Workouts': '/workout',
    'Posture improvement': '/posture',
    'Diet plan': '/diet',
    'Recovery sessions': '/recovery',
    'Read articles': '/articles',
    'Watch videos': '/course',
  };

  const [tasksDone, setTasksDone] = useState([]); // Initially empty
  const [tasksToDo, setTasksToDo] = useState(initialTasksToDo);
  const [pendingTask, setPendingTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
    localStorage.setItem('tasksToDo', JSON.stringify(tasksToDo));

    const pending = localStorage.getItem('pendingTask');
    if (pending && tasksToDo.includes(pending)) {
      setPendingTask(pending);
    }
  }, [tasksDone, tasksToDo]);

  const handleLinkClick = (task) => {
    localStorage.setItem('pendingTask', task);
  };

  const handleTaskCompletion = (isCompleted) => {
    if (isCompleted && pendingTask) {
      setTasksDone((prev) => [...prev, pendingTask]);
      setTasksToDo((prev) => prev.filter((task) => task !== pendingTask));
      setSnackbarOpen(true);
    }
    localStorage.removeItem('pendingTask');
    setPendingTask(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Box for Task Insights */}
        <Grid item xs={12} lg={6}>
          <MainCard sx={{ height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Task Insights
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="h5" color="secondary.main">Tasks Done</Typography>
                  {tasksDone.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                      No tasks completed yet.
                    </Typography>
                  ) : (
                    <List>
                      {tasksDone.map((task, index) => (
                        <Tooltip title="Completed Task" arrow key={index}>
                          <ListItem>
                            <DoneIcon color="success" sx={{ mr: 1 }} />
                            <ListItemText primary={task} />
                          </ListItem>
                        </Tooltip>
                      ))}
                    </List>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="h5" color="secondary.main">Tasks to Do</Typography>
                  {tasksToDo.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                      No tasks left to do!
                    </Typography>
                  ) : (
                    <List>
                      {tasksToDo.map((task, index) => (
                        <Tooltip title="Pending Task" arrow key={index}>
                          <ListItem
                            component="a"
                            href={taskLinks[task]}
                            onClick={() => handleLinkClick(task)}
                          >
                            <TodoIcon color="action" sx={{ mr: 1 }} />
                            <ListItemText primary={task} />
                          </ListItem>
                        </Tooltip>
                      ))}
                    </List>
                  )}
                </Box>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        {/* Separate Box for Dyad Relationships */}
        {/* <Grid item xs={12} lg={6}>
          <DyadContainers />
        </Grid> */}
      </Grid>

      {/* Dialog for Task Completion */}
      {pendingTask && (
        <Dialog open={true} onClose={() => handleTaskCompletion(false)}>
          <DialogTitle>Task Completion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Have you completed the task: "{pendingTask}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleTaskCompletion(false)} color="primary">
              Not Yet
            </Button>
            <Button onClick={() => handleTaskCompletion(true)} color="primary">
              Yes, Completed
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for Feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Task marked as completed!
        </Alert>
      </Snackbar>
    </Container>
  );
}
