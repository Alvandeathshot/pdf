import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, TextField, DialogActions, Button, Box, Avatar, Paper, List, ListItem,
  ListItemText, IconButton, Divider, Menu, MenuItem, ListItemAvatar, Dialog, DialogTitle, DialogContent,
  ListItemIcon
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

export default function DiscussionPage() {
  const [joinedCommunities, setJoinedCommunities] = useState([
    { name: 'Dyadic Health', description: 'A community focused on health discussions.' },
    { name: 'Dyadic Health 2', description: 'This channel focuses on mental health.' },
    { name: 'Dyadic Health 3', description: 'A community around fitness and nutrition.' },
  ]);
  const [selectedChannel, setSelectedChannel] = useState('Dyadic Health');
  const [messages, setMessages] = useState({
    'Dyadic Health': [{ text: 'Welcome to Dyadic Health!', sender: 'system', time: '11:00 AM' }],
    'Dyadic Health 2': [{ text: 'This is Dyadic Health 2. Feel free to chat!', sender: 'system', time: '11:05 AM' }],
    'Dyadic Health 3': [{ text: 'You are now in Dyadic Health 3. Start the discussion!', sender: 'system', time: '11:10 AM' }],
  });
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [shareOpen, setShareOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [messageToDeleteIndex, setMessageToDeleteIndex] = useState(null);

  const channelProfilePictures = {
    'Dyadic Health': 'https://example.com/dyadic-health.png',
    'Dyadic Health 2': 'https://example.com/dyadic-health-2.png',
    'Dyadic Health 3': 'https://example.com/dyadic-health-3.png',
  };

  const channelInfo = {
    'Dyadic Health': { description: 'A community focused on health discussions and well-being.', members: 120, created: 'January 1, 2023' },
    'Dyadic Health 2': { description: 'This channel focuses on mental health and mindfulness.', members: 80, created: 'March 10, 2023' },
    'Dyadic Health 3': { description: 'A community dedicated to discussions around fitness and nutrition.', members: 95, created: 'May 15, 2023' },
  };

  const handleChannelChange = (channel) => setSelectedChannel(channel);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '' || selectedImage) {
      const newMessage = {
        text: inputMessage,
        image: selectedImage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChannel]: [...prevMessages[selectedChannel], newMessage],
      }));
      setInputMessage('');
      setSelectedImage(null);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=https://dyadic-health.com/channel/${selectedChannel}`,
    twitter: `https://twitter.com/intent/tweet?text=Check out this awesome channel: ${selectedChannel}!&url=https://dyadic-health.com/channel/${selectedChannel}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=https://dyadic-health.com/channel/${selectedChannel}&title=Join%20Dyadic%20Health%20Channel%20${selectedChannel}`,
  };

  const handleInfoClick = () => {
    setInfoOpen(true);
    handleMenuClose();
  };

  const handleInfoClose = () => setInfoOpen(false);

  const handleShareClick = () => {
    setShareOpen(true);
    handleMenuClose();
  };

  const handleShareClose = () => setShareOpen(false);

  const handleDeleteMessage = (index) => {
    setConfirmDeleteOpen(true);
    setMessageToDeleteIndex(index);
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setMessageToDeleteIndex(null);
  };

  const confirmDelete = () => {
    if (messageToDeleteIndex !== null) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChannel]: prevMessages[selectedChannel].filter((_, index) => index !== messageToDeleteIndex),
      }));
      setConfirmDeleteOpen(false);
      setMessageToDeleteIndex(null);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', height: '46vh', bgcolor: '#f5f5f5' , ml:-2,mt:-2 }}>

        <Box sx={{ height: '50vh', width: '60vw', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ display: 'flex', height: '100%', width: '100%', borderRadius: '3%' }}>
              <Box
                sx={{
                  width: { xs: '100%', sm: '30%', md: '25%' },
                  p: 2,
                  bgcolor: '#f5f5f5',
                  borderRight: '1px solid #ddd',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '18px',
                    paddingBottom: '10px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Joined Communities
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Search..."
                  variant="outlined"
                  borderRight="10px"
                  InputProps={{
                    startAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
                <List sx={{ mt: 2, flex: 1 }}>
                  {joinedCommunities.map((community) => (
                    <ListItem key={community.name} button onClick={() => handleChannelChange(community.name)}>
                      <ListItemAvatar>
                        <Avatar src={channelProfilePictures[community.name]} />
                      </ListItemAvatar>
                      <ListItemText primary={community.name} />
                    </ListItem>
                  ))}
                </List>

                <Divider />

                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Logged in as: Dyadic Health
                  </Typography>
                </Box>
              </Box>
        </Paper>
        </Box>
      </Box>
      

      <Dialog open={infoOpen} onClose={handleInfoClose}>
        <DialogTitle>Community Info</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{channelInfo[selectedChannel]?.description}</Typography>
          <Typography variant="body2" color="textSecondary">Created: {channelInfo[selectedChannel]?.created}</Typography>
        </DialogContent>
        <DialogActions><Button onClick={handleInfoClose} color="primary">Close</Button></DialogActions>
      </Dialog>

      <Dialog open={shareOpen} onClose={handleShareClose}>
        <DialogTitle>Share Channel</DialogTitle>
        <DialogContent>
          <IconButton href={shareLinks.facebook} target="_blank"><FacebookIcon /></IconButton>
          <IconButton href={shareLinks.twitter} target="_blank"><TwitterIcon /></IconButton>
          <IconButton href={shareLinks.linkedin} target="_blank"><LinkedInIcon /></IconButton>
        </DialogContent>
        <DialogActions><Button onClick={handleShareClose} color="primary">Close</Button></DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this message?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}