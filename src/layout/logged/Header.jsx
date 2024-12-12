import PropTypes from 'prop-types';
import { useState, cloneElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// project-imports
import { APP_DEFAULT_PATH, ThemeDirection } from 'config';
import IconButton from 'components/@extended/IconButton';
import Logo from 'components/logo';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import Profile from 'layout/Dashboard/Header/HeaderContent/Profile';

// assets
import { DocumentDownload, ExportSquare, HambergerMenu, Minus } from 'iconsax-react';

// elevation scroll
function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined,
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger
        ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)'
        : 'none',
      backgroundColor: trigger
        ? alpha(theme.palette.background.default, 0.8)
        : alpha(theme.palette.background.default, 0.1),
    },
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = 'landing', ...others }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const { menuMaster } = useGetMenuMaster();

  const menuItemStyles = {
    fontFamily: 'timesnewroman',
    fontSize: '16',
    fontWeight: '600',
  };

  /** Method called on multiple components with different event types */
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
            <Stack
              direction="row"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
              alignItems="center"
            >
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
                  fontWeight: 700,
                  '&:hover': { color: 'lightblue' },
                  color: '#3366ff',
                  fontSize: 18,
                  fontFamily: 'timesnewroman',
                },
              }}
            >
              <Link
                className="header-link"
                sx={{ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 }}
                color="secondary.main"
                component={RouterLink}
                to="/hello/landing"
                target=""
                underline="none"
              >
                Home
              </Link>
              <Link
                className="header-link"
                color="secondary.main"
                component={RouterLink}
                to="/hello/about-us"
                underline="none"
              >
                About Us
              </Link>

              {/* Offerings Link with Dropdown */}
              <Box
                onMouseEnter={handleMenuOpen}
                onMouseLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    handleMenuClose();
                  }
                }}
              >
                <Button
                  aria-controls={isMenuOpen ? 'articles-menu' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                  className="header-link"
                  sx={{
                    color: theme.palette.secondary.main,
                    textTransform: 'none',
                    fontFamily: 'timesnewroman',
                    fontSize: '18',
                    fontWeight: 'bold',
                  }}
                >
                  Offerings
                </Button>
                <Menu
                  id="articles-menu"
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  sx={{ mt: 1 }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  MenuListProps={{
                    onMouseLeave: (event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        handleMenuClose();
                      }
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleMenuClose}
                    component={RouterLink}
                    to="/hello/Articles"
                    sx={menuItemStyles}
                  >
                    Articles
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={RouterLink}
                    to="/hello/Foundation"
                    sx={menuItemStyles}
                  >
                    Foundation
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={RouterLink}
                    to="/hello/Training"
                    sx={menuItemStyles}
                  >
                    Training
                  </MenuItem>
                </Menu>
              </Box>

              {/* Profile Component added here */}
              <Box sx={{ marginLeft: 'auto' }}>
                <Profile />
              </Box>
            </Stack>

            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo to="/" />
              </Typography>
              <Stack direction="row" spacing={2}>
                {layout === 'component' && (
                  <Button
                    variant="outlined"
                    color="warning"
                    component={RouterLink}
                    to={APP_DEFAULT_PATH}
                    sx={{ mt: 0.25 }}
                  >
                    Dashboard
                  </Button>
                )}

                <IconButton
                  size="large"
                  color="secondary"
                  {...(layout === 'component'
                    ? {
                        onClick: () =>
                          handlerComponentDrawer(!menuMaster.isComponentDrawerOpened),
                      }
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
                      minWidth: 32,
                    },
                  }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/landing"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Home"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/about-us"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="About Us"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link>

                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/Articles"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Articles"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/Resources"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Videos"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/Foundation"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Foundation"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/Training"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Training"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                    {/* <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to="/login"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemtext
                          primary="Login / Registration"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Link> */}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

ElevationScroll.propTypes = {
  layout: PropTypes.string,
  children: PropTypes.node,
  window: PropTypes.any,
};

Header.propTypes = {
  layout: PropTypes.string,
  others: PropTypes.any,
};
