import React, { useState } from 'react';
import {
  Grid,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  TextField,
  Slide,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Checkbox,
} from '@mui/material';
import MainCard from 'components/MainCard';

// Predefined dyad data
const dyadList = [
  { name: 'Son', details: "This is the son's details. Age: 15, School: High School." },
  { name: 'Daughter', details: "This is the daughter's details. Age: 20, University: Engineering." },
  { name: 'Wife', details: "This is the wife's details. Age: 40, Occupation: Doctor." },
  { name: 'Father', details: "This is the father's details. Age: 65, Retired." },
];

// Predefined relationship options
const relationshipOptions = [
  'Parent',
  'Sibling',
  'Child',
  'Spouse',
  'Friend',
  'Colleague',
  'Other',
];

export default function DyadContainers() {
  const [dyads, setDyads] = useState(dyadList);
  const [selectedDyad, setSelectedDyad] = useState(dyadList[0]);
  const [isAddingDyad, setIsAddingDyad] = useState(false);
  const [newDyad, setNewDyad] = useState({
    fname: '',
    lname: '',
    dob: '',
    email: '',
    relationship: '',
    details: '',
  });
  const [showDeleteList, setShowDeleteList] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleDyadClick = (dyad) => {
    setSelectedDyad(dyad);
  };

  const handleAddDyadClick = () => {
    setIsAddingDyad(true);
    setShowDeleteList(false);
    setNewDyad({ fname: '', lname: '', dob: '', email: '', relationship: '', details: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewDyad((prevDyad) => ({ ...prevDyad, [name]: value }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email); // Simple email regex validation

  const handleAddDyadSubmit = async () => {
    if (!newDyad.fname || !newDyad.lname || !newDyad.dob || !newDyad.email || !newDyad.relationship || !newDyad.details) {
      setSnackbarMessage("All fields are required!");
      setSnackbarOpen(true);
      return;
    }

    if (!validateEmail(newDyad.email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true); // Start loading
    const fullName = `${newDyad.fname} ${newDyad.lname}`;
    const newDyadEntry = { name: fullName, details: `${newDyad.relationship} - ${newDyad.details}` };
    setDyads([...dyads, newDyadEntry]);
    setSelectedDyad(newDyadEntry);
    setNewDyad({ fname: '', lname: '', dob: '', email: '', relationship: '', details: '' });
    setIsAddingDyad(false);
    setLoading(false); // Stop loading
  };

  const handleCancelAddDyad = () => {
    setIsAddingDyad(false);
    setNewDyad({ fname: '', lname: '', dob: '', email: '', relationship: '', details: '' });
  };

  const handleDeleteDyadToggle = () => {
    setShowDeleteList(!showDeleteList);
    setSelectedForDeletion([]);
  };

  const handleToggleCheckbox = (dyadName) => {
    setSelectedForDeletion((prev) =>
      prev.includes(dyadName)
        ? prev.filter((name) => name !== dyadName)
        : [...prev, dyadName]
    );
  };

  const handleDeleteSelectedDyads = () => {
    const updatedDyads = dyads.filter((dyad) => !selectedForDeletion.includes(dyad.name));
    setDyads(updatedDyads);
    setSnackbarMessage(`${selectedForDeletion.join(', ')} has been deleted.`);
    setSnackbarOpen(true);
    setShowDeleteList(false);
    setSelectedForDeletion([]);
    if (updatedDyads.length > 0) {
      setSelectedDyad(updatedDyads[0]);
    } else {
      setSelectedDyad({});
    }
  };

  return (
    <MainCard sx={{ height: '100%' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        {isAddingDyad ? (
          <Slide direction="up" in={isAddingDyad} mountOnEnter unmountOnExit>
            <Grid item xs={12}>
              <MainCard content={false} border={false} sx={{ bgcolor: 'background.default', height: '100%' }}>
                <Stack alignItems="center" sx={{ p: 2 }} spacing={2}>
                  <Typography variant="h5">Add New Dyad</Typography>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="First Name"
                      name="fname"
                      value={newDyad.fname}
                      onChange={handleFormChange}
                      fullWidth
                    />
                    <TextField
                      label="Last Name"
                      name="lname"
                      value={newDyad.lname}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={newDyad.dob}
                    onChange={handleFormChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={newDyad.email}
                    onChange={handleFormChange}
                    fullWidth
                  />
                  <FormControl fullWidth>
                    <InputLabel>Relationship</InputLabel>
                    <Select
                      name="relationship"
                      value={newDyad.relationship}
                      onChange={handleFormChange}
                      label="Relationship"
                    >
                      {relationshipOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Details"
                    name="details"
                    value={newDyad.details}
                    onChange={handleFormChange}
                    multiline
                    rows={2}
                    fullWidth
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelAddDyad}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddDyadSubmit}
                      disabled={loading} // Disable while loading
                    >
                      {loading ? 'Adding...' : 'Add'} {/* Loading text */}
                    </Button>
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>
          </Slide>
        ) : showDeleteList ? (
          <Grid item xs={12}>
            <MainCard content={false} border={false} sx={{ bgcolor: 'background.default', height: '100%' }}>
              <Stack alignItems="center" sx={{ p: 2 }} spacing={0}>
                <Typography variant="h5">Delete Dyads</Typography>
                <List>
                  {dyads.map((dyad) => (
                    <ListItem key={dyad.name} dense>
                      <Checkbox
                        checked={selectedForDeletion.includes(dyad.name)}
                        onChange={() => handleToggleCheckbox(dyad.name)}
                      />
                      <ListItemText primary={dyad.name} />
                    </ListItem>
                  ))}
                </List>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" color="secondary" onClick={handleDeleteDyadToggle}>
                    Cancel
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleDeleteSelectedDyads}>
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sm={6} sx={{ borderRight: '1px solid #e0e0e0' }}>
              <MainCard content={false} border={false} sx={{ bgcolor: 'background.default', height: '100%' }}>
                <Stack alignItems="center" sx={{ p: 2 }} spacing={0.5}>
                  <Typography variant="h5">Dyad Relationships</Typography>
                  {dyads.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                    Please add your dyad pairs.
                  </Typography>
                ) : (
                  <List>
                    {dyads.map((dyad) => (
                      <ListItem
                        button
                        key={dyad.name}
                        onClick={() => handleDyadClick(dyad)}
                        divider
                        selected={selectedDyad.name === dyad.name}
                      >
                        <ListItemAvatar>
                          <Avatar variant="rounded" sx={{ bgcolor: 'secondary.light', color: 'secondary.darker' }}>
                            {dyad.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={dyad.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
                </Stack>
              </MainCard>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
              <MainCard content={false} border={false} sx={{ bgcolor: 'background.default', height: '100%' }}>
                <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
                  <Typography variant="h6">Dyad Details</Typography>
                  {dyads.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                    Your dyad details.
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    {selectedDyad.details}
                  </Typography>
                )}
                </Stack>
              </MainCard>
            </Grid>
          </>
        )}
      </Grid>

      <Slide direction="up" in={!isAddingDyad && !showDeleteList} mountOnEnter unmountOnExit>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{
            mt: { xs: 2, md: 6 },
            ml: { xs: 0, md: 34 },
          }}
        >
          <Button variant="contained"  color="error" onClick={handleDeleteDyadToggle} sx={{ mb: 2, mr: 1 }}>
            Delete Dyad
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddDyadClick} sx={{ mb: 2 }}>
            Add Dyad
          </Button>
        </Grid>
      </Slide>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </MainCard>
  );
}
