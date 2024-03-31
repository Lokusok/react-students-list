import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import NavigationDesktop from '@src/containers/navigation-desktop';
import NavigationMobile from '@src/containers/navigation-mobile';

const drawerWidth = 240;

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        STUDE-LIST
      </Typography>
      <Divider />
      <NavigationMobile />
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="header" sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Container>
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component={Link}
                sx={{
                  display: { xs: 'none', sm: 'inline-block' },
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'opacity ease 0.2s',

                  '&:hover': { opacity: 0.7 },
                  '&:active': { opacity: 0.3 },
                }}
                to="/"
                data-testid="logo"
              >
                STUDE-LIST
              </Typography>
            </Box>

            <NavigationDesktop />
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default memo(Header);
