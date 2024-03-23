import { memo } from 'react';

import { Link } from 'react-router-dom';

import { ListItemButton, ListItem, ListItemText, List } from '@mui/material';

const navItems = [
  {
    name: 'Просмотр',
    path: '/',
  },

  {
    name: 'Управление',
    path: '/panel',
  },
];

function NavigationMobile() {
  return (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default memo(NavigationMobile);
