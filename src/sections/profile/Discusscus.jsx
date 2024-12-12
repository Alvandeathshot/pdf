// // material-ui
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// export default function DiscussionBoard() {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5">Discussion Board</Typography>
//       <Box sx={{ mt: 2, p: 2, border: '1px solid gray', borderRadius: 2 }}>
//         <Typography variant="body1">User 1: This is a comment</Typography>
//         <Typography variant="body1">User 2: Another commen</Typography>
//       </Box>
//     </Box>
//   );
// }




// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chat from 'pages/dashboard/discussion';
import Community from 'sections/extra-pages/discussion/communityselection';

export default function DiscussionBoard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Discussion Board</Typography>
      <Box sx={{ mt: 2, p: 2, border: '1px solid gray', borderRadius: 2 }}>
        {/* <Chat /> */}
        <Community />
      </Box>
    </Box>
  );
}