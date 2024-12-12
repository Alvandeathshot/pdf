import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, DialogActions, Button, Box, Avatar, Paper, List, ListItem, ListItemText, IconButton, Divider, Menu, MenuItem, ListItemAvatar, Dialog, DialogTitle, DialogContent, ListItemIcon } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import backgroundImage from 'src/assets/images/discussion/background.jpg';

import Sidebar from 'sections/extra-pages/discussion/sidebar';

export default function DiscussionPage() {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('');

  // Other existing states
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
  const [followedChannels, setFollowedChannels] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [messageToDeleteIndex, setMessageToDeleteIndex] = useState(null);

  const communities = [
    { name: 'Dyadic Health', description: 'A community focused on health discussions.' },
    { name: 'Dyadic Health 2', description: 'This channel focuses on mental health.' },
    { name: 'Dyadic Health 3', description: 'A community around fitness and nutrition.' },
  ];

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

  // Handle channel change
  const handleChannelChange = (channel) => {
    setSelectedChannel(channel);
  };

  // Handle send message
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

  // Handle community selection
  const handleJoinCommunity = (community) => {
    if (!joinedCommunities.find((comm) => comm.name === community.name)) {
      setJoinedCommunities([...joinedCommunities, community]);
      setSelectedChannel(community.name);
    }
  };

  // Handle leaving community
  const handleLeaveCommunity = (community) => {
    const updatedCommunities = joinedCommunities.filter((comm) => comm.name !== community.name);
    setJoinedCommunities(updatedCommunities);
    if (selectedChannel === community.name) {
      setSelectedChannel(updatedCommunities.length > 0 ? updatedCommunities[0].name : ''); // Set default to another community if available
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=https://dyadic-health.com/channel/${selectedChannel}`,
    twitter: `https://twitter.com/intent/tweet?text=Check out this awesome channel: ${selectedChannel}!&url=https://dyadic-health.com/channel/${selectedChannel}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=https://dyadic-health.com/channel/${selectedChannel}&title=Join%20Dyadic%20Health%20Channel%20${selectedChannel}`,
  };


  const handleInfoClick = () => {
    setInfoOpen(true);
    handleMenuClose();
  };

  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const handleShareClick = () => {
    setShareOpen(true);
    handleMenuClose();
  };

  const handleShareClose = () => {
    setShareOpen(false);
  };

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

   // Filtering out joined communities from the available communities list
   const availableCommunities = communities.filter(community => 
    !joinedCommunities.find(comm => comm.name === community.name)
  );

  return (
    <>
      <Box sx={{ padding: 3, backgroundImage: `url(${backgroundImage})`, borderRadius: 3 }}>
        {/* Conditionally render the Available Communities title and list */}
        {availableCommunities.length > 0 && (
          <>
            <Typography variant="h4" gutterBottom>
              Available Communities
            </Typography>
            <List>
              {availableCommunities.map((community) => (
                <ListItem key={community.name} button>
                  <ListItemAvatar>
                    <Avatar src={channelProfilePictures[community.name]} />
                  </ListItemAvatar>
                  <ListItemText primary={community.name} secondary={community.description} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleJoinCommunity(community)}
                    sx={{ marginLeft: 2 }}
                  >
                    Join
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Divider sx={{ borderBottomWidth: 3 }} />
        <br />

        {joinedCommunities.length > 0 && (
          <Box sx={{ height: '50vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={2} sx={{ display: 'flex', height: '100%', width: '63%' }}>
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
                    fontSize: '20px',
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

              {selectedChannel && (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <AppBar position="static" color="default" elevation={1}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Display profile picture for the selected channel */}
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }} src={channelProfilePictures[selectedChannel]} />
                      <Typography variant="h6" color="inherit">
                        {selectedChannel}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                    {channelInfo[selectedChannel].members} members
                  </Typography>
                    </Box>
                    <Box>  
                      <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}
                       anchorOrigin={{
                        vertical: 'bottom', // Change to 'top' if you want the menu to appear above the icon
                        horizontal: 'right', // Change this to 'left', 'center' or 'right' as needed
                      }}
                      transformOrigin={{
                        vertical: 'top', // Change to 'bottom' if you want the menu to appear below the icon
                        horizontal: 'right', // Change this to 'left', 'center' or 'right' as needed
                      }}
                      >
                        <MenuItem onClick={handleInfoClick}>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText primary="Community Info" />
                        </MenuItem>
                        {/* New Leave Community Menu Item */}
        <MenuItem onClick={() => handleLeaveCommunity({ name: selectedChannel })}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Leave Community" />
        </MenuItem>
                        <MenuItem onClick={handleShareClick}>
                          <ListItemIcon>
                            <ShareIcon />
                          </ListItemIcon>
                          <ListItemText primary="Share Community" />
                        </MenuItem>
                      </Menu>
                      </Box>
                    </Toolbar>
                  </AppBar>

                  <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex',flexDirection: 'column',bgcolor: '#fafafa',}}>
                    {messages[selectedChannel]?.map((message, index) => (
                      <Box key={index} sx={{
                        alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        p: 1,
                        mb: 2,
                        mr: 3,
                        bgcolor: message.sender === 'user' ? '#c8e6c9' : '#e0f7fa',
                        borderRadius: 2,
                        position: 'relative',
                      }}
                      >
                        {message.image ? (
                    <Box
                    component="img"
                    src={message.image}
                    alt="sent image"
                    sx={{ 
                      maxWidth: '100%',         // Ensure the image fits within the chat bubble
                      maxHeight: '200px',       // Limit the height to 200px (like in WhatsApp)
                      borderRadius: 2,          // Optional: for rounded corners
                      objectFit: 'cover',       // Maintain aspect ratio while covering space
                      marginBottom: '1em',      // Adds spacing between the image and text
                    }}
                    />
                  ) : null}
                  <Typography variant="body1" >{message.text}</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                    {message.time}
                  </Typography>
                  {message.sender === 'user' && ( // Show delete option only for user messages
                    <IconButton
                      onClick={() => handleDeleteMessage(index)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        p: 0,
                        marginRight: '-30px',
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                    ))}
                  </Box>

                  <Box component="form"
              sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #ddd' }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}>
                    <TextField
                fullWidth
                placeholder="Write a message..."
                variant="outlined"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                sx={{ mr: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
              >
                Send
              </Button>
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmDeleteOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this message?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

            {/* Community info dialog */}
            <Dialog open={infoOpen} onClose={handleInfoClose}>
              <DialogTitle>Community Info</DialogTitle>
              <DialogContent>
                <Typography variant="body1">{channelInfo[selectedChannel]?.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Members: {channelInfo[selectedChannel]?.members}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created on: {channelInfo[selectedChannel]?.created}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleInfoClose}>Close</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={shareOpen} onClose={handleShareClose}>
        <DialogTitle>Share {selectedChannel}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem button component="a" href={shareLinks.facebook} target="_blank" >
              <ListItemIcon>
                <FacebookIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Share on Facebook" />
            </ListItem>
            <ListItem button component="a" href={shareLinks.twitter} target="_blank">
              <ListItemIcon>
                <TwitterIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Share on Twitter" />
            </ListItem>
            <ListItem button component="a" href={shareLinks.linkedin} target="_blank">
              <ListItemIcon>
                <LinkedInIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Share on LinkedIn" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
          </Box>
        )}
      </Box>
    </>
  );
}
