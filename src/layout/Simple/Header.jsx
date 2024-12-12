import PropTypes from 'prop-types';
import { useState, cloneElement, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import {
  alpha,
  useTheme,
  AppBar,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';
import { HambergerMenu, Minus } from 'iconsax-react';

// project-imports
import APP_DEFAULT_PATH from 'config';
// import IconButton from 'components/@extended/IconButton';
import Logo from 'components/logo';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// assets
import HowItWorks from './HowItWorks'; // Import the HowItWorks component

// elevation scroll
function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger ? alpha(theme.palette.background.default, 0.8) : alpha(theme.palette.background.default, 0.1)
    }
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = 'landing', ...others }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openHowItWorks, setOpenHowItWorks] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const { menuMaster } = useGetMenuMaster();

  const location = useLocation();
  const navigate = useNavigate();

  const menuItemStyles = {
    fontFamily: 'arial',
    fontSize: '16',
    fontWeight: '300',
  };

  const scrollToSection = (sectionId, offset = 100) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  const handleOfferingsClick = () => {
    if (location.pathname === '/') {
      scrollToSection('technologies', 100);
    } else {
      navigate('/#technologies'); // Navigate with hash
      setTimeout(() => scrollToSection('technologies', 100), 300); // Delay for offset scrolling
    }
  };
  
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(sectionId, 100), 300); // Delay for hash scrolling
    }
  }, [location]);
  

  const handleHowItWorksOpen = () => {
    setOpenHowItWorks(true);
  };

  const handleHowItWorksClose = () => {
    setOpenHowItWorks(false);
  };

  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let url;
  let value = window.location.search;
  const params = new URLSearchParams(value);
  const ispValue = params.get('isp');

  return (
    <>
      <ElevationScroll layout={layout} {...others}>
        <AppBar
          sx={{
            bgcolor: alpha(theme.palette.background.default, 1),
            backdropFilter: 'blur(900px)',
            color: theme.palette.text.primary,
            boxShadow: 'none',
          }}
        >
          <Container maxWidth="xl" disableGutters={matchDownMd}>
            <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
              <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
                <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
                  <Logo to="/" />
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  alignItems: 'center',
                  display: { xs: 'none', md: 'flex' },
                  '& .header-link': {
                    fontWeight: 500,
                    '&:hover': { color: 'lightblue' },
                    color: '#3366ff',
                    fontSize: 18,
                    fontFamily: 'Noto Sans JP',
                  },
                }}
              >
                <Link
                  className="header-link"
                  component={RouterLink}
                  to="/"
                  underline="none"
                >
                  Home
                </Link>
                <Link
                  className="header-link"
                  component="button"
                  onClick={handleOfferingsClick}
                  underline="none"
                  offset=""
                >
                  Offerings
                </Link>
                <Link
                  className="header-link"
                  component="button"
                  onClick={handleHowItWorksOpen}
                  underline="none"
                >
                  How it works
                </Link>
                <Button
                  className="header-link"
                  color="secondary"
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderColor: '#3366ff',
                    color: '#3366ff',
                    textTransform: 'none',
                    fontFamily: 'timesnewroman',
                    fontSize: 18,
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      color: '#3366ff',
                      borderColor: '#3366ff',
                    }
                  }}
                >
                  Login / Sign Up
                </Button>
              </Stack>
              <Box
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: { xs: 'flex', md: 'none' }
                }}
              >
                <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
                  <Logo to="/" />
                </Typography>
                <Stack direction="row" spacing={2}>
                  {layout === 'component' && (
                    <Button variant="outlined" color="warning" component={RouterLink} to={APP_DEFAULT_PATH} sx={{ mt: 0.25 }}>
                      Dashboard
                    </Button>
                  )}

                  <IconButton
                    size="large"
                    color="secondary"
                    {...(layout === 'component'
                      ? { onClick: () => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened) }
                      : { onClick: drawerToggler(true) })}
                    sx={{ p: 1 }}
                  >
                    <HambergerMenu />
                  </IconButton>
                </Stack>
                <Drawer
                  anchor="top"
                  open={drawerToggle}
                  onClose={drawerToggler(false)}
                  sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
                >
                  <Box
                    sx={{
                      width: 'auto',
                      '& .MuiListItemIcon-root': {
                        fontSize: '1rem',
                        minWidth: 32
                      }
                    }}
                    role="presentation"
                    onClick={drawerToggler(false)}
                    onKeyDown={drawerToggler(false)}
                  >
                    <List sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Link style={{ textDecoration: 'none' }} component={RouterLink} to="/landing">
                        <ListItemButton>
                          <ListItemIcon>
                            <Minus color={theme.palette.secondary.main} />
                          </ListItemIcon>
                          <ListItemText primary="Home" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} component="button" onClick={handleOfferingsClick}>
                        <ListItemButton>
                          <ListItemIcon>
                            <Minus color={theme.palette.secondary.main} />
                          </ListItemIcon>
                          <ListItemText primary="Offerings" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} component="button" onClick={handleHowItWorksOpen}>
                        <ListItemButton>
                          <ListItemIcon>
                            <Minus color={theme.palette.secondary.main} />
                          </ListItemIcon>
                          <ListItemText primary=" How it works" primaryTypographyProps={{ variant: 'h6', color: 'secondary.main' }} />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      <Dialog
        open={openHowItWorks}
        onClose={handleHowItWorksClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="how-it-works-dialog-title"
      >
        <DialogTitle id="how-it-works-dialog-title"></DialogTitle>
        <DialogContent>
          <HowItWorks closePopup={handleHowItWorksClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHowItWorksClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ElevationScroll.propTypes = { layout: PropTypes.string, children: PropTypes.node, window: PropTypes.any };
Header.propTypes = { layout: PropTypes.string, others: PropTypes.any };
