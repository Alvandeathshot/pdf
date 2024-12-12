import React, { useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import DiscussHome from './discussHome';
import DiscussChat from './discussChat';

const contentComponents = {
  Home: () => <DiscussHome />,
  Chat: () => <DiscussChat />,
  Bookmarks: () => <Typography variant="h4">Your bookmarks will be displayed here.</Typography>,
  Notifications: () => <Typography variant="h4">Notifications will be listed here.</Typography>,
  Settings: () => <Typography variant="h4">Adjust your settings here.</Typography>,
};

export default function MinimalSidebar() {
  // State to keep track of the active icon and content
  const [activeIcon, setActiveIcon] = useState('Home');

  // Function to handle icon click
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  const ActiveContent = contentComponents[activeIcon]; // Get the active content component

  return (
    <Box sx={{ display: 'flex' }}>
      <Paper>

        <Box
          sx={{
            width: 70,
            bgcolor: '#1f1f1f', // Dark background color
            color: '#bfbfbf', // Light icon color
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            '&:hover': {
              bgcolor: '#2c2c2c', // Slightly lighter background on hover
            },
          }}
        >
          {/* Vertical Text */}
          <Typography
            variant="h6"
            sx={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              color: 'white',
              mb: 4,
            }}
          >
            DH
          </Typography>

          {/* Home Icon with Link */}
          <Tooltip title="Home" placement="right">
            <IconButton
              color="inherit"
              aria-label="Home"
              onClick={() => handleIconClick('Home')}
              sx={{
                color: activeIcon === 'Home' ? '#ff4081' : 'inherit', // Change color if active
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Chat" placement="right">
            <IconButton
              color="inherit"
              aria-label="Chat"
              onClick={() => handleIconClick('Chat')}
              sx={{
                color: activeIcon === 'Chat' ? '#ff4081' : 'inherit',
              }}
            >
              <ChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Bookmarks" placement="right">
            <IconButton
              color="inherit"
              aria-label="Bookmarks"
              onClick={() => handleIconClick('Bookmarks')}
              sx={{
                color: activeIcon === 'Bookmarks' ? '#ff4081' : 'inherit',
              }}
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications" placement="right">
            <IconButton
              color="inherit"
              aria-label="Notifications"
              onClick={() => handleIconClick('Notifications')}
              sx={{
                color: activeIcon === 'Notifications' ? '#ff4081' : 'inherit',
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings" placement="right">
            <IconButton
              color="inherit"
              aria-label="Settings"
              onClick={() => handleIconClick('Settings')}
              sx={{
                color: activeIcon === 'Settings' ? '#ff4081' : 'inherit',
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Logout icon at the bottom */}
          <Tooltip title="Logout" placement="right">
            <IconButton
              color="inherit"
              aria-label="Logout"
              onClick={() => handleIconClick('Logout')}
              sx={{
                color: activeIcon === 'Logout' ? '#ff4081' : 'inherit',
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Content Area */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <ActiveContent /> {/* Render the active content */}
      </Box>
    </Box>
  );
}
