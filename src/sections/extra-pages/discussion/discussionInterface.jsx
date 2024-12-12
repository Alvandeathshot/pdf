import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Box, Avatar, Paper, List, ListItem, ListItemText, IconButton, Divider, Menu, MenuItem, ListItemAvatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DiscussionInterface() {
  // State to manage the selected channel
  const [selectedChannel, setSelectedChannel] = useState('Dyadic Health');
  const [messages, setMessages] = useState({
    'Dyadic Health': [{ text: 'Welcome to Dyadic Health!', sender: 'system', time: '11:00 AM' }],
    'Dyadic Health 2': [{ text: 'This is Dyadic Health 2. Feel free to chat!', sender: 'system', time: '11:05 AM' }],
    'Dyadic Health 3': [{ text: 'You are now in Dyadic Health 3. Start the discussion!', sender: 'system', time: '11:10 AM' }],
  });
  const [inputMessage, setInputMessage] = useState('');

  // State for menu in header
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Channel profile pictures
  const channelProfilePictures = {
    'Dyadic Health': 'https://example.com/dyadic-health.png',
    'Dyadic Health 2': 'https://example.com/dyadic-health-2.png',
    'Dyadic Health 3': 'https://example.com/dyadic-health-3.png',
  };

  // Handle channel change
  const handleChannelChange = (channel) => setSelectedChannel(channel);

  // Handle message sending
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { text: inputMessage, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prev) => ({ ...prev, [selectedChannel]: [...prev[selectedChannel], newMessage] }));
      setInputMessage(''); // Clear the input after sending
    }
  };

  // Handle menu toggle
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      {/* Full Screen Container */}
      <Box sx={{ height: '90vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={3} sx={{ display: 'flex', height: '100%', width: '100%' }}>
          
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: '100%', sm: '30%', md: '25%' },
              p: 2,
              bgcolor: '#f5f5f5',
              borderRight: '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column',
              height: { xs: 'auto', sm: '100%' },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '16px', sm: '20px' },
                pb: 2,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Dyadic Health Communities
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
              {['Dyadic Health', 'Dyadic Health 2', 'Dyadic Health 3'].map((channel) => (
                <ListItem 
                  button 
                  key={channel} 
                  onClick={() => handleChannelChange(channel)}
                  selected={selectedChannel === channel} // Highlights the active channel
                >
                  <ListItemAvatar>
                    <Avatar src={channelProfilePictures[channel]} />
                  </ListItemAvatar>
                  <ListItemText primary={channel} />
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

          {/* Chat Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Chat Header */}
            <AppBar position="static" color="default" elevation={1}>
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }} src={channelProfilePictures[selectedChannel]} />
                  <Typography variant="h6" component="div">
                    {selectedChannel}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 1, color: 'green' }}>
                    Online
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>

                  <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>Channel info</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Follow</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Share</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Report</MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </AppBar>

            {/* Chat Body (scrollable) */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#fafafa',
              }}
            >
              {messages[selectedChannel].map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    p: 1,
                    mb: 2,
                    bgcolor: message.sender === 'user' ? '#c8e6c9' : '#e0f7fa',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                    {message.time}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Chat Footer */}
            <Box
              component="form"
              sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #ddd' }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <TextField
                fullWidth
                placeholder="Write a message..."
                variant="outlined"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                sx={{ mr: 2 }}
              />
              <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSendMessage}>
                Send
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
