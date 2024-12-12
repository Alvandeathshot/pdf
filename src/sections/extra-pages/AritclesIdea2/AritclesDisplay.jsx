import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

// Article image
import image1 from 'assets/images/articles/ArticleImage/ArticlesDisplayImages/Image2.png';
import image2 from 'assets/images/articles/ArticleImage/ArticlesDisplayImages/image1.png';
import image3 from 'assets/images/articles/ArticleImage/ArticlesDisplayImages/image3.png';
import image4 from 'assets/images/articles/ArticleImage/ArticlesDisplayImages/image4.png';
import image5 from 'assets/images/articles/ArticleImage/ArticlesDisplayImages/image5.png';

const Accordions = () => {
  const images = [image1, image2, image3, image4, image5];
  const titles = [
    'The Role of Breathing in Dyadic Health',
    'The Vital Role of Dyadic Health in Overall Wellbeing',
    'Understanding Dyadic Health: The Secret to Building Stronger Relationships',
    'Dyadic Health in Spousal Relationships',
    'Understanding the Dynamics of Parent-Child Relationships',
  ];
  const descriptions = [
  'Explores how breathing practices can harmonize relationships and enhance dyadic health through connection and stress reduction.',
  'Highlights the significance of dyadic health in fostering overall well-being and mutual growth.',
  'Examines the concept of dyadic health as a foundation for building stronger, healthier relationships.',
  'Discusses the impact of dyadic health on spousal relationships, focusing on emotional and psychological well-being.',
  'Explores the dynamics of parent-child relationships and their influence on family harmony and development.',
  ];

  // const links = [
  //   '/articles/2',
  //   '/articles/1',
  //   '/articles/5',
  //   '/articles/3',
  //   '/articles/4',
  // ];

  const [visible, setVisible] = useState(new Array(images.length).fill(false));
  const cardRefs = useRef(images.map(() => React.createRef()));

  useEffect(() => {
    // const observer = new IntersectionObserver(
    //   entries => {
    //     entries.forEach(entry => {
    //       if (entry.isIntersecting) {
    //         const index = cardRefs.current.findIndex(ref => ref.current === entry.target);
    //         setVisible(prev => {
    //           const newVisibles = [...prev];
    //           newVisibles[index] = true;
    //           return newVisibles;
    //         });
    //       }
    //     });
    //   },
    //   { threshold: 0.5 }
    // );

    cardRefs.current.forEach((ref, index) => {
      // if (ref.current) {
      //   observer.observe(ref.current);
      // }
    });

    return () => {
      cardRefs.current.forEach((ref, index) => {
        // if (ref.current) {
        //   observer.unobserve(ref.current);
        // }
      });
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ECEDF3',
          color: '#37474f',
          height: {
            xs: '300px',
            sm: '400px',
            md: '500px',
          },
          padding: {
            xs: '20px',
            sm: '40px',
            md: '50px',
          },
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: { xs: '20px', sm: '30px', md: '50px' },
            color: '#37474f',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: {
              xs: '24px',
              sm: '28px',
              md: '32px',
              lg: '36px',
              xl: '30px'
            },
          }}
        >
          Articles
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'space-evenly',
            marginInline: '20px',
            width: '100%',
            height: '340px',
            overflowX: 'auto',
          }}
        >
          {images.map((image, index) => (
            <Card
              key={index}
              ref={cardRefs.current[index]}
              sx={{
                minWidth: '150px',
                height: '100%',
                borderRadius: '30px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexGrow: 1,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.5s ease',
                '&:hover': {
                  flexGrow: 7,
                  '& .background': {
                    filter: 'brightness(0.5)', // Brighten on hover
                  },
                  '& .content-visible': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '& .icon-container': {
                    opacity: 0, // Hide icon on hover
                  }
                },
              }}
            >
              <Box
                className="background"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'brightness(0.7)', // Slightly darker in rest position
                  transition: 'filter 0.35s ease',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  transition: 'opacity 0.3s, transform 0.3s',
                  opacity: 0, // Initially hidden
                  transform: 'translateY(20px)',
                }}
                className="content-visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {titles[index]}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: 'white',
                    fontSize: '14px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {descriptions[index]}
                </Typography>
                <Button
                  variant="contained"
                  // href={links[index]} // Add the link here
                  sx={{
                    mt: 2,
                    backgroundColor: '#0072ea',
                    '&:hover': {
                      backgroundColor: '#005bb5',
                    },
                  }}
                >
                  Coming Soon
                </Button>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: '10px',
                  width: '100%',
                  opacity: 1, // Visible in rest position
                  transition: 'opacity 0.3s ease',
                }}
                className="icon-container"
              >
                <ArticleIcon
                  sx={{
                    fill: '#cccccc',
                    width: '40px',
                    height: '40px',
                    border: '2px solid white',
                    borderRadius: '50%',
                    padding: '10px',
                    boxSizing: 'content-box',
                  }}
                />
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Accordions;
