import { memo } from 'react';

import { Link } from 'react-router-dom';

import { ListItemButton, ListItem, ListItemText, List } from '@mui/material';
import { navigation } from '@src/shared/data/navigation';
import ThemeToggler from '@src/components/theme-toggler';
import { useTheme } from '@mui/joy/styles';

function NavigationMobile() {
  const theme = useTheme();

  return (
    <List>
      {navigation.map((item) => (
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
