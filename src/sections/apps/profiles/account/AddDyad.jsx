import { useEffect, useState } from 'react';

// material-ui imports as already present
import {
  useTheme,
  Box,
  Grid,
  Stack,
  Button,
  MenuItem,
  FormLabel,
  TextField,
  InputLabel,
  Typography,
  Select,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports and assets
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

import { ThemeMode, facebookColor, linkedInColor } from 'config';
import defaultImages from 'assets/images/users/default.png';

// constants
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

// The main AddDyad component
export default function AddDyad() {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(defaultImages);
  const [showForm, setShowForm] = useState(false); // To show/hide the form
  const [dyads, setDyads] = useState([]); // Example dyads
  const [checkboxChecked, setCheckboxChecked] = useState(false); // Checkbox state
  const [experience, setExperience] = useState('0');

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // Add a dyad (example, modify to suit your data handling)
  const handleAddDyad = () => {
    setShowForm(true);
  };

  const handleChange = (event) => {
    setExperience(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  const handleFormSubmit = () => {
    // Handle form submission, for now just a console log
    console.log("Form submitted");
  };

  return (
    <Grid container spacing={3}>
      {/* Section to display dyads if any */}
      <Grid item xs={12}>
        <MainCard title="Existing Dyads">
          {dyads.length > 0 ? (
            <Grid container spacing={2}>
              {dyads.map((dyad, index) => (
                <Grid item xs={12} key={index}>
                  <Typography>{dyad.name}</Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No Dyads Found</Typography>
          )}
        </MainCard>
      </Grid>

      {/* Add Dyad Button */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddDyad}>
          Add Dyad
        </Button>
      </Grid>

      {/* Conditional Dyad Form */}
      {showForm && (
        <Grid item xs={12}>
          <MainCard title="Add Dyad">
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Checkbox checked={checkboxChecked} onChange={handleCheckboxChange} />
                }
                label="Only ask for email, relationship, and goal"
              />

              {!checkboxChecked ? (
                <>
                  {/* Profile Picture */}
                  <FormLabel htmlFor="change-avatar">
                    <Stack spacing={2.5} alignItems="center">
                      <Avatar alt="Avatar" src={avatar} sx={{ width: 76, height: 76 }} />
                      <TextField
                        type="file"
                        id="change-avatar"
                        sx={{ display: 'none' }}
                        onChange={(e) => setSelectedImage(e.target.files?.[0])}
                      />
                    </Stack>
                  </FormLabel>

                  {/* First Name */}
                  <TextField fullWidth label="First Name" placeholder="First Name" />

                  {/* Last Name */}
                  <TextField fullWidth label="Last Name" placeholder="Last Name" />

                  {/* Gender */}
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>

                  {/* Age */}
                  <InputLabel htmlFor="age-select">Age</InputLabel>
                  <Select fullWidth id="age-select">
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                  </Select>

                  {/* Email */}
                  <TextField
                    type="email"
                    fullWidth
                    label="Email"
                    placeholder="Email"
                    required
                  />


                  {/* Relationship */}
                  <InputLabel htmlFor="relationship-select">Relationship</InputLabel>
                  <Select fullWidth id="relationship-select">
                    <MenuItem value="friend">Friend</MenuItem>
                    <MenuItem value="colleague">Colleague</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                  </Select>

                  {/* Goals */}
                  <InputLabel htmlFor="goals-select">Goals</InputLabel>
                  <Select fullWidth id="goals-select">
                    <MenuItem value="career">Career</MenuItem>
                    <MenuItem value="personal">Personal</MenuItem>
                  </Select>
                </>
              ) : (
                <>
                  {/* If checkbox is checked, show only email, relationship, and goal */}
                  <TextField
                    type="email"
                    fullWidth
                    label="Email"
                    placeholder="Email"
                    required
                  />

                  {/* Relationship */}
                  <InputLabel htmlFor="relationship-select">Relationship</InputLabel>
                  <Select fullWidth id="relationship-select">
                    <MenuItem value="friend">Friend</MenuItem>
                    <MenuItem value="colleague">Colleague</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                  </Select>

                  {/* Goals */}
                  <InputLabel htmlFor="goals-select">Goals</InputLabel>
                  <Select fullWidth id="goals-select">
                    <MenuItem value="career">Career</MenuItem>
                    <MenuItem value="personal">Personal</MenuItem>
                  </Select>
                </>
              )}

              {/* Submit Button */}
              <Button variant="contained" onClick={handleFormSubmit}>
                Submit
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      )}
    </Grid>
  );
}
