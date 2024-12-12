// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
// } from "@mui/material";

// // Import images
// import Image1 from "assets/images/landingImages/LandingImagess2/pexels-jopwell-2422294.jpg";
// import Image2 from "assets/images/landingImages/LandingImagess2/pexels-fauxels-3184183.jpg";
// import Image3 from "assets/images/landingImages/LandingImagess2/pexels-belle-co-99483-1000445.jpg";
// import Image4 from "assets/images/landingImages/LandingImagess2/pexels-ceekris-1756665.jpg";
// import Image5 from "assets/images/landingImages/LandingImagess2/3.jpg";

// const CustomCard = ({ logo, title, description, onKnowMoreClick, isExpanded, borderColor }) => {
//   return (
//     <Card
//       sx={{
//         width: 250,
//         padding: 2,
//         borderRadius: 2,
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
//         textAlign: "center",
//         margin: 1,
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         border: isExpanded ? `1px solid ${borderColor}` : "1px solid #D3D3D3", // Default grey border
//         "@media (max-width: 768px)": {
//           width: "100vw", // Make the card width responsive on mobile
//           height: "auto", // Adjust height to be auto so the content fits inside
//           padding: 2, // You can adjust padding on mobile
//     },
//         "&:hover": {
//           transform: "scale(1.02)",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         sx={{ borderRadius: "5%", height: 80, objectFit: "cover", margin: "0 auto" }}
//         image={logo}
//         alt={title}
//       />
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: "bold", marginY: 1 }}>
//           {title}
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ marginBottom: 2 }}
//         >
//           {description}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{
//             backgroundColor: "#eaf2ff",
//             color: "#007bff",
//             textTransform: "none",
//             borderRadius: 3,
//             ":hover": {
//               backgroundColor: "#eaf2ff",
//               color: "#007bff",
//             },
//           }}
//           onClick={onKnowMoreClick}
//         >
//           {isExpanded ? "Hide" : "Know more"}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// const App = () => {
//   const [expandedCard, setExpandedCard] = useState(null);

//   const cardsData = [
//     {
//       logo: Image1,
//       title: "Dyadic Health",
//       description: "Dyadic Health looks at how the relationship between two people impacts their health.",
//       additionalContent: "Detailed information about Dyadic Health.",
//       borderColor: "#FF6347", // Tomato red for this card
//     },
//     {
//       logo: Image2,
//       title: "Relationship Between Two People",
//       description: "Two people’s relationship affects their well-being.",
//       additionalContent: "Insights into relationships between two people.",
//       borderColor: "#32CD32", // Lime green for this card
//     },
//     {
//       logo: Image3,
//       title: "Spousal Relationships",
//       description: " The connections between married partners, impacting well-being.",
//       additionalContent: "Exploring the dynamics of spousal relationships.",
//       borderColor: "#1E90FF", // Dodger blue for this card
//     },
//     {
//       logo: Image4,
//       title: "Parental Relationships",
//       description: "Parental relationships shape children’s emotional and developmental well-being.",
//       additionalContent: "Insights into parental relationships and roles.",
//       borderColor: "#FFD700", // Gold for this card
//     },
//     {
//       logo: Image5,
//       title: "Caregiving & Sibling Relationships",
//       description: "Caregiving and sibling bonds impact well-being.",
//       additionalContent: "Understanding caregiving and sibling relationships.",
//       borderColor: "#8A2BE2", // Blue violet for this card
//     },
//   ];

//   const handleKnowMoreClick = (index) => {
//     setExpandedCard(expandedCard === index ? null : index);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 2,
//         boxSizing: "border-box",
//         backgroundColor: '#ffffff',
//         width: '100%',
//         textAlign: 'center',
//       }}
//     >
//         {/* Heading */}
//         <Typography variant="h3" sx={{ marginBottom: 2, fontWeight: "bold", color: '#37474f',textAlign: 'center', }}>
//             Explore Relationship Dynamics
//         </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           overflowX: "auto",
//           width: "100%",
//           paddingBottom: 2, // Space between cards and border
//         }}
//       >
//         {cardsData.map((card, index) => (
//           <CustomCard
//             key={index}
//             {...card}
//             onKnowMoreClick={() => handleKnowMoreClick(index)}
//             isExpanded={expandedCard === index}
//             borderColor={card.borderColor} // Pass unique border color to each card
//           />
//         ))}
//       </Box>
//       {expandedCard !== null && (
//         <Box
//           sx={{
//             marginTop: -2.5,
//             padding: 4,
//             width: "calc(250px * 5 + 8px * 8)", // 5 cards, 8px gap (adjust based on your gap)
//             maxWidth: "100%", // Ensure it doesn't overflow on smaller screens
//             border: `1px solid ${cardsData[expandedCard].borderColor}`, // Matching border for expanded content
//             borderRadius: 2,
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//             backgroundColor: "#f9f9f9",
//             textAlign: "center", 
//           }}
//         >
//           <Typography variant="h5" sx={{ marginBottom: 2 }}>
//             {cardsData[expandedCard].title}
//           </Typography>
//           <Typography variant="body1">
//             {cardsData[expandedCard].additionalContent}
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default App;




import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Import images
import Image1 from "assets/images/landingImages/LandingImagess2/DyadicHealth.png";
import Image2 from "assets/images/landingImages/LandingImagess2/BetweenTwoPeople.png";
import Image3 from "assets/images/landingImages/LandingImagess2/SpousalRelationships.jpg";
import Image4 from "assets/images/landingImages/LandingImagess2/ParentalRelationship.jpg";
import Image5 from "assets/images/landingImages/LandingImagess2/CaregivingandSibling.png";

const CustomCard = ({ logo, title, description, paragraph1, paragraph2, isExpanded, borderColor }) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        width: 250,
        height: 420,
        padding: 2,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
        margin: 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        border: isExpanded ? `1px solid ${borderColor}` : "1px solid #D3D3D3", // Default grey border
        "@media (max-width: 768px)": {
          width: "100vw", // Make the card width responsive on mobile
          padding: 2, // You can adjust padding on mobile
          mt:4,
        },
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          border: `1px solid ${borderColor}`, // Dynamic hover border color
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ borderRadius: "5%", height: 100, objectFit: "cover", margin: "0 auto" }}
        image={logo}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginY: 1 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2,
            textAlign: 'left',  // Justifies the text to both ends
            lineHeight: 1.6, // Ensures proper spacing between lines
            display: 'block', // Ensures block-level formatting
            width: '100%', // Ensure it stretches across the full width
           }}
        >
          {/* {description} */}
          {paragraph1}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2,
            textAlign: 'left',  // Justifies the text to both ends
            lineHeight: 1.6, // Ensures proper spacing between lines
            display: 'block', // Ensures block-level formatting
            width: '100%', // Ensure it stretches across the full width
           }}
        >
          {paragraph2}
        </Typography>
      </CardContent>
    </Card>
  );
};

const App = () => {

  const cardsData = [
    {
      logo: Image1,
      title: "Dyadic Health",
      // description: "Dyadic Health focuses on the well-being of two individuals, emphasizing communication, trust, and empathy. Strengthening these qualities fosters stability, reduces stress, and nurtures fulfilling relationships.",
      paragraph1: "Dyadic Health focuses on the well-being of two individuals, emphasizing communication, trust, and empathy.",
      paragraph2: "Strengthening these qualities fosters stability, reduces stress, and nurtures fulfilling relationships.",
      borderColor: "#FF6347", // Tomato red for this card
    },
    {
      logo: Image2,
      title: "Dyadic Relationships",
      // description: "Dyadic Health emphasizes the well-being of two individuals in a relationship, shaped by key attributes like communication, empathy, trust, and security. Understanding these dynamics offers valuable insights into improving relational health.",
      paragraph1: "Dyadic Health emphasizes the well-being of two individuals in a relationship, shaped by key attributes like communication, empathy, trust, and security.",
      paragraph2: "Understanding these dynamics offers valuable insights into improving relational health.",
      borderColor: "#32CD32", // Lime green for this card
    },
    {
      logo: Image3,
      title: "Spousal Relationships",
      // description: "Spousal relationships profoundly impact each partner's well-being and life satisfaction. Addressing challenges like communication gaps, emotional struggles, and coping with illnesses can strengthen bonds, encourage mutual support, and foster healthy habits.",
      paragraph1: "Spousal relationships profoundly impact each partner's well-being and life satisfaction.",
      paragraph2: "Addressing challenges like communication gaps, emotional struggles, and coping with illnesses can strengthen bonds, encourage mutual support, and foster healthy habits.",
      borderColor: "#1E90FF", // Dodger blue for this card
    },
    {
      logo: Image4,
      title: "Parental Relationships",
      // description: "Parent-child relationships, rooted in guidance and love, form the foundation for growth. Overcoming challenges like communication issues, managing expectations, and creating a nurturing environment promotes wellness and mutual growth.",
      paragraph1: "Parent-child relationships, rooted in guidance and love, form the foundation for growth.",
      paragraph2: "Overcoming challenges like communication issues, managing expectations, and creating a nurturing environment promotes wellness and mutual growth.",
      borderColor: "#FFD700", // Gold for this card
    },
    {
      logo: Image5,
      title: "Other Dyads",
      // description: "Strong dyadic relationships benefit from mutual respect, collaboration, and effective conflict resolution. Addressing challenges such as boundaries and personal growth enhances communication, fosters development, and strengthens bonds.",
      paragraph1: "Strong dyadic relationships benefit from mutual respect, collaboration, and effective conflict resolution.",
      paragraph2: " Addressing challenges such as boundaries and personal growth enhances communication, fosters development, and strengthens bonds.",
      borderColor: "#8A2BE2", // Blue violet for this card
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        padding: 4,
        overflowX: "auto",
        backgroundColor: '#ffffff',
        boxSizing: "border-box",
        "@media (max-width: 768px)": {
          width: '100%',
        },
      }}
    >
        {/* Heading */}
        <Typography variant="h3" sx={{ 
          marginBottom: 2, 
          fontWeight: "bold",
          fontSize: { xs: '28px', sm: '24px', md: '30px' }, 
          color: '#37474f',
          textAlign: 'center',
          "@media (max-width: 768px)": {
          mt:20,
        },
         }}>
            Explore Relationship Dynamics
        </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: { xs: 'none',sm: 'center',md: 'center',lg: 'center',xl: 'center' },
          alignItems: { xs: 'none',sm: 'center',md: 'center',lg: 'center',xl: 'center' },
          overflowX: "auto",
          paddingBottom: 2, // Space between cards and border
        }}
      >
        {cardsData.map((card, index) => (
          <CustomCard
            key={index}
            {...card}
          />
        ))}
      </Box>
    </Box>
  );
};

export default App;