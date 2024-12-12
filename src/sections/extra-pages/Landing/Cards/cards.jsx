import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

// Import images from the assets folder
import image1 from 'assets/images/landingImages/LandingImagess2/BetweenTwoPeople.png';
import image2 from 'assets/images/landingImages/LandingImagess2/SpousalRelationships.jpg';
import image3 from 'assets/images/landingImages/LandingImagess2/ParentalRelationship.jpg';
import image4 from 'assets/images/landingImages/LandingImagess2/CaregivingandSibling.png';

export default function Hero4(
  {currentTextIndex },
  {
  offset = 0,
  scaleFactor = 0.05,
  flipInterval = 4000,
  cardWidth = "55vw",
  cardHeight = "60vh",
  fallbackImage = "https://via.placeholder.com/400?text=Image+Not+Found"
}) {
  const [cards, setCards] = useState([
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
  ]);

  const images = [
    image1, // Image related to textLines[0]
    image2, // Image related to textLines[1]
    image3, // Image related to textLines[2]
    image4, // Image related to textLines[3]
  ];
  const currentImage = images[currentTextIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, flipInterval);
    return () => clearInterval(interval);
  }, [flipInterval]);

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <Box
      style={{
        position: "relative",
        width: cardWidth,
        height: cardHeight,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.6, delay: index * 0.25 },
            scale: { duration: 0.4, delay: index * 0.25 },
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: cardWidth,
            height: cardHeight,
            top: -index * offset,
            transform: `translateX(-50%) scale(${1 - index * scaleFactor})`,
            zIndex: cards.length - index,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "1.5rem",
              overflow: "hidden",
              "@media (max-width: 768px)": {
                flexDirection: 'column',
                mt: '18px',
                height: "35vh", // Allow height to adjust based on content
                width: "85vw",
                borderRadius: "1rem", // Smaller border radius
                marginLeft: '-56px'
              },
            }}
          >
            <img
              src={currentImage}
              alt={`Image for ${card.name}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1.5rem",
              }}
              onError={handleImageError}
            />
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
                padding: "1.5rem",
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                borderRadius: "0 0 1.5rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
                  margin: 0,
                }}
              >
                {card.name}
              </p>
              <p
                style={{
                  fontSize: "1.125rem",
                  opacity: 0.9,
                  textShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                  margin: 0,
                }}
              >
                {card.description}
              </p>
            </div>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
