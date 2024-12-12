// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// asset
import WelcomeImage from 'assets/images/analytics/welcome-banner.png';
import cardBack from 'assets/images/widget/img-dropbox-bg.svg';

// react-slick
import Slider from 'react-slick';

// ==============================|| ANALYTICS - BANNER CAROUSEL ||============================== // 
export default function RotatingBanner() {
  const theme = useTheme();

  // Settings for the slider
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Loop the banners
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one banner at a time
    slidesToScroll: 1, // Scroll one banner at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time interval between slides
    arrows: false, // Disable next/prev arrows for simplicity
  };

  return (
    <MainCard
      border={false}
      sx={{
        color: 'common.white',
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.400' : 'primary.darker',
        '&:after': {
          content: '""',
          background: `url("${cardBack}") 100% 100% / cover no-repeat`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.5,
        },
      }}
    >
      <Slider {...settings}>
        {/* Slide 1 */}
        <Box sx={{ position: 'relative' }}>
          <Grid container>
            <Grid item md={6} sm={6} xs={12}>
              <Stack spacing={2} sx={{ padding: 3 }}>
                <Typography variant="h2" color={theme.palette.background.paper}>
                  Explore Redesigned 
                </Typography>
                <Typography variant="h6" color={theme.palette.background.paper}>
                  The Brand new User Interface with the power of Material-UI Components. Explore the Endless possibilities with Able Pro.
                </Typography>
                <Box sx={{ pt: 1.5 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href="https://1.envato.market/c/1289604/275988/4415?subId1=phoenixcoded&u=https%3A%2F%2Fthemeforest.net%2Fitem%2Fable-pro-responsive-bootstrap-4-admin-template%2F19300403"
                    sx={{
                      color: 'background.paper',
                      borderColor: theme.palette.background.paper,
                      zIndex: 2,
                      '&:hover': { color: 'background.paper', borderColor: theme.palette.background.paper, bgcolor: 'primary.main' },
                    }}
                    target="_blank"
                  >
                    Exclusive on Themeforest
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
              <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 }, zIndex: 2 }} justifyContent="center" alignItems="flex-end">
                <img src={WelcomeImage} alt="Welcome" width="200px" />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Slide 2 */}
        <Box sx={{ position: 'relative' }}>
          <Grid container>
            <Grid item md={6} sm={6} xs={12}>
              <Stack spacing={2} sx={{ padding: 3 }}>
                <Typography variant="h2" color={theme.palette.background.paper}>
                  The Future of Web Design
                </Typography>
                <Typography variant="h6" color={theme.palette.background.paper}>
                  Take your design to the next level with cutting-edge UI/UX tools and components.
                </Typography>
                <Box sx={{ pt: 1.5 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href="#"
                    sx={{
                      color: 'background.paper',
                      borderColor: theme.palette.background.paper,
                      zIndex: 2,
                      '&:hover': { color: 'background.paper', borderColor: theme.palette.background.paper, bgcolor: 'primary.main' },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
              <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 }, zIndex: 2 }} justifyContent="center" alignItems="flex-end">
                <img src="https://via.placeholder.com/200" alt="Future Design" width="200px" />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Add more slides as needed */}
      </Slider>
    </MainCard>
  );
}
