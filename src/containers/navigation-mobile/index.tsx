import { memo } from 'react';

import { Link } from 'react-router-dom';

import { ListItemButton, ListItem, ListItemText, List } from '@mui/material';
import ThemeToggler from '@src/components/theme-toggler';
import { useTheme } from '@mui/joy/styles';

import { navigationMobile } from '@src/shared/data/navigation';

function NavigationMobile() {
  const theme = useTheme();

  return (
    <List>
      {navigationMobile.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
      <ThemeToggler
        lightColor={theme.vars.palette.primary[500]}
        darkColor="#fff"
      />
    </List>
  );
}

export default memo(NavigationMobile);
