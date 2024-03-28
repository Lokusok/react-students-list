import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import ThemeToggler from '@src/components/theme-toggler';
import { navigation } from '@src/shared/data/navigation';

function NavigationDesktop() {
  const location = useLocation();

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navigation.map((item) => (
        <Button
          component={Link}
          to={item.path}
          key={item.name}
          sx={{
            color: '#fff',
            opacity: location.pathname === item.path ? '0.65' : '1',
          }}
        >
          {item.name}
        </Button>
      ))}
      <ThemeToggler />
    </Box>
  );
}

export default memo(NavigationDesktop);
