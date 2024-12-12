// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, TextField,  DialogActions, Button, Box, Avatar, Paper, List, ListItem, ListItemText, IconButton, Divider, Menu, MenuItem, ListItemAvatar, Dialog, DialogTitle, DialogContent, ListItemIcon } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ShareIcon from '@mui/icons-material/Share';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import InfoIcon from '@mui/icons-material/Info';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ImageIcon from '@mui/icons-material/Image';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon

// // project imports
// // import DiscussionHeader from 'sections/extra-pages/discussion/discussionhead';
// // import Free from 'sections/landing/Free';
// import Sidebar from 'sections/extra-pages/discussion/sidebar';

// export default function DiscussionPage() {
//   const [selectedChannel, setSelectedChannel] = useState('Dyadic Health');
//   const [messages, setMessages] = useState({
//     'Dyadic Health': [
//       { text: 'Welcome to Dyadic Health!', sender: 'system', time: '11:00 AM' },
//     ],
//     'Dyadic Health 2': [
//       { text: 'This is Dyadic Health 2. Feel free to chat!', sender: 'system', time: '11:05 AM' },
//     ],
//     'Dyadic Health 3': [
//       { text: 'You are now in Dyadic Health 3. Start the discussion!', sender: 'system', time: '11:10 AM' },
//     ],
//   });
//   const [inputMessage, setInputMessage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [shareOpen, setShareOpen] = useState(false);
//   const [infoOpen, setInfoOpen] = useState(false);
//   const [followedChannels, setFollowedChannels] = useState([]);

//    // Confirmation dialog states
//    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//    const [messageToDeleteIndex, setMessageToDeleteIndex] = useState(null);

//   const channelProfilePictures = {
//     'Dyadic Health': 'https://example.com/dyadic-health.png',
//     'Dyadic Health 2': 'https://example.com/dyadic-health-2.png',
//     'Dyadic Health 3': 'https://example.com/dyadic-health-3.png',
//   };

//   const channelInfo = {
//     'Dyadic Health': {
//       description: 'A community focused on health discussions and well-being.',
//       members: 120,
//       created: 'January 1, 2023',
//     },
//     'Dyadic Health 2': {
//       description: 'This channel focuses on mental health and mindfulness.',
//       members: 80,
//       created: 'March 10, 2023',
//     },
//     'Dyadic Health 3': {
//       description: 'A community dedicated to discussions around fitness and nutrition.',
//       members: 95,
//       created: 'May 15, 2023',
//     },
//   };

//   const handleChannelChange = (channel) => {
//     setSelectedChannel(channel);
//   };

//   const handleSendMessage = () => {
//     if (inputMessage.trim() !== '' || selectedImage) {
//       const newMessage = {
//         text: inputMessage,
//         image: selectedImage,
//         sender: 'user', // logged-in user
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [selectedChannel]: [...prevMessages[selectedChannel], newMessage],
//       }));
//       setInputMessage('');
//       setSelectedImage(null);
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setSelectedImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleShareClick = () => {
//     setShareOpen(true);
//     handleMenuClose();
//   };

//   const handleInfoClick = () => {
//     setInfoOpen(true);
//     handleMenuClose();
//   };

//   const handleShareClose = () => {
//     setShareOpen(false);
//   };

//   const handleInfoClose = () => {
//     setInfoOpen(false);
//   };

//   const shareLinks = {
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=https://dyadic-health.com/channel/${selectedChannel}`,
//     twitter: `https://twitter.com/intent/tweet?text=Check out this awesome channel: ${selectedChannel}!&url=https://dyadic-health.com/channel/${selectedChannel}`,
//     linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=https://dyadic-health.com/channel/${selectedChannel}&title=Join%20Dyadic%20Health%20Channel%20${selectedChannel}`,
//   };

//   const handleFollowToggle = () => {
//     if (followedChannels.includes(selectedChannel)) {
//       setFollowedChannels((prev) => prev.filter((channel) => channel !== selectedChannel));
//     } else {
//       setFollowedChannels((prev) => [...prev, selectedChannel]);
//     }
//     handleMenuClose();
//   };

//   // Updated delete functionality - only for user messages
//   const handleDeleteMessage = (index) => {
//     const messageToDelete = messages[selectedChannel][index];
//     if (messageToDelete.sender === 'user') { // Allow only user-sent messages to be deleted
//       setMessageToDeleteIndex(index);
//       setConfirmDeleteOpen(true); // Open confirmation dialog
//     } else {
//       alert("You can only delete your own messages.");
//     }
//   };

//   const confirmDelete = () => {
//     setMessages((prevMessages) => ({
//       ...prevMessages,
//       [selectedChannel]: prevMessages[selectedChannel].filter((_, i) => i !== messageToDeleteIndex),
//     }));
//     setConfirmDeleteOpen(false);
//     setMessageToDeleteIndex(null);
//   };

//   const cancelDelete = () => {
//     setConfirmDeleteOpen(false);
//     setMessageToDeleteIndex(null);
//   };

//   return (
//     <>
//       {/* <Box sx={{ width: '100%', padding: '20px 0' }}>
//         <DiscussionHeader />
//       </Box> */}
//       <Box
//         sx={{
//           height: '60vh',
//           width: '100vw',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Paper elevation={3} sx={{ display: 'flex', height: '100%', width: '66%' }}>
//           <Box
//             sx={{
//               width: { xs: '100%', sm: '30%', md: '25%' },
//               p: 2,
//               bgcolor: '#f5f5f5',
//               borderRight: '1px solid #ddd',
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: '20px',
//                 paddingBottom: '10px',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//               }}
//             >
//               Dyadic Health Communities
//             </Typography>

//             <TextField
//               fullWidth
//               placeholder="Search..."
//               variant="outlined"
//               InputProps={{
//                 startAdornment: (
//                   <IconButton>
//                     <SearchIcon />
//                   </IconButton>
//                 ),
//               }}
//             />

//             <List sx={{ mt: 2, flex: 1 }}>
//               {['Dyadic Health', 'Dyadic Health 2', 'Dyadic Health 3'].map((channel) => (
//                 <ListItem 
//                   button 
//                   key={channel} 
//                   onClick={() => handleChannelChange(channel)}
//                   selected={selectedChannel === channel}
//                 >
//                   <ListItemAvatar>
//                     <Avatar src={channelProfilePictures[channel]} />
//                   </ListItemAvatar>
//                   <ListItemText primary={channel} />
//                 </ListItem>
//               ))}
//             </List>

//             <Divider />

//             <Box sx={{ textAlign: 'center', py: 2 }}>
//               <Typography variant="caption" color="textSecondary">
//                 Logged in as: Dyadic Health
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
//             <AppBar position="static" color="default" elevation={1}>
//               <Toolbar sx={{ justifyContent: 'space-between' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   {/* Display profile picture for the selected channel */}
//                   <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }} src={channelProfilePictures[selectedChannel]} />
//                   <Typography variant="h6" color="inherit">
//                     {selectedChannel}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
//                     {channelInfo[selectedChannel].members} members
//                   </Typography>
//                 </Box>

//                 <Box>
//                   <IconButton onClick={handleMenuClick}>
//                     <MoreVertIcon />
//                   </IconButton>

//                   <Menu
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleMenuClose}
//                   >
//                     <MenuItem onClick={handleFollowToggle}>
//                       <ListItemIcon>
//                         {followedChannels.includes(selectedChannel) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//                       </ListItemIcon>
//                       <ListItemText primary={followedChannels.includes(selectedChannel) ? 'Unfollow' : 'Follow'} />
//                     </MenuItem>

//                     <MenuItem onClick={handleInfoClick}>
//                       <ListItemIcon>
//                         <InfoIcon />
//                       </ListItemIcon>
//                       <ListItemText primary="Channel Info" />
//                     </MenuItem>

//                     <MenuItem onClick={handleShareClick}>
//                       <ListItemIcon>
//                         <ShareIcon />
//                       </ListItemIcon>
//                       <ListItemText primary="Share" />
//                     </MenuItem>
//                   </Menu>
//                 </Box>
//               </Toolbar>
//             </AppBar>

//             <Box
//               sx={{
//                 flex: 1,
//                 p: 2,
//                 overflowY: 'auto',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 bgcolor: '#fafafa',
//               }}
//             >
//               {messages[selectedChannel].map((message, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
//                     maxWidth: '70%',
//                     p: 1,
//                     mb: 2,
//                     mr: 3,
//                     bgcolor: message.sender === 'user' ? '#c8e6c9' : '#e0f7fa',
//                     borderRadius: 2,
//                     position: 'relative',
//                   }}
//                 >
//                   {message.image ? (
//                     <Box
//                     component="img"
//                     src={message.image}
//                     alt="sent image"
//                     sx={{ 
//                       maxWidth: '100%',         // Ensure the image fits within the chat bubble
//                       maxHeight: '200px',       // Limit the height to 200px (like in WhatsApp)
//                       borderRadius: 2,          // Optional: for rounded corners
//                       objectFit: 'cover',       // Maintain aspect ratio while covering space
//                       marginBottom: '1em',      // Adds spacing between the image and text
//                     }}
//                     />
//                   ) : null}
//                   <Typography variant="body1" >{message.text}</Typography>
//                   <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
//                     {message.time}
//                   </Typography>
//                   {message.sender === 'user' && ( // Show delete option only for user messages
//                     <IconButton
//                       onClick={() => handleDeleteMessage(index)}
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         right: 0,
//                         p: 0,
//                         marginRight: '-30px',
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   )}
//                 </Box>
//               ))}
//             </Box>

//             <Box
//               component="form"
//               sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #ddd' }}
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSendMessage();
//               }}
//             >
//               <TextField
//                 fullWidth
//                 placeholder="Write a message..."
//                 variant="outlined"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 sx={{ mr: 2 }}
//               />

//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange}
//                 id="image-upload"
//                 style={{ display: 'none' }}
//               />
//               <label htmlFor="image-upload">
//                 <IconButton color="primary" component="span">
//                   <ImageIcon />
//                 </IconButton>
//               </label>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 endIcon={<SendIcon />}
//                 onClick={handleSendMessage}
//               >
//                 Send
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>

//       {/* Confirmation Dialog for Delete */}
//       <Dialog open={confirmDeleteOpen} onClose={cancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this message?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={cancelDelete} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={shareOpen} onClose={handleShareClose}>
//         <DialogTitle>Share {selectedChannel}</DialogTitle>
//         <DialogContent>
//           <List>
//             <ListItem button component="a" href={shareLinks.facebook} target="_blank">
//               <ListItemIcon>
//                 <FacebookIcon />
//               </ListItemIcon>
//               <ListItemText primary="Share on Facebook" />
//             </ListItem>
//             <ListItem button component="a" href={shareLinks.twitter} target="_blank">
//               <ListItemIcon>
//                 <TwitterIcon />
//               </ListItemIcon>
//               <ListItemText primary="Share on Twitter" />
//             </ListItem>
//             <ListItem button component="a" href={shareLinks.linkedin} target="_blank">
//               <ListItemIcon>
//                 <LinkedInIcon />
//               </ListItemIcon>
//               <ListItemText primary="Share on LinkedIn" />
//             </ListItem>
//           </List>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={infoOpen} onClose={handleInfoClose}>
//         <DialogTitle>{selectedChannel} Info</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             {channelInfo[selectedChannel].description}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//             Members: {channelInfo[selectedChannel].members}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//             Created: {channelInfo[selectedChannel].created}
//           </Typography>
//         </DialogContent>
//       </Dialog>

//       {/* <Free /> */}
//     </>
//   );
// }






import React from 'react';
import SideBar from 'sections/extra-pages/discussion/sidebar';
import Box from '@mui/material/Box'; // Correct import for Box
import { Typography } from '@mui/material';

export default function DiscussionPage() {
  return (
    <Box sx={{ display: 'flex', height: '50vh' , mt:20}}>
      {/* Sidebar */}
      <SideBar />
      
      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5', // Light background color for main content
          padding: 3, // Add some padding
        }}
      >
        <Typography variant="h4" gutterBottom>
          Discussion Area
        </Typography>
        {/* Add more content here as needed */}
      </Box>
    </Box>
  );
}
