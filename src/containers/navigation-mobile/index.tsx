import { memo } from 'react';

import { Link } from 'react-router-dom';

import { ListItemButton, ListItem, ListItemText, List } from '@mui/material';
import { navigation } from '@src/shared/data/navigation';

function NavigationMobile() {
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
    </List>
  );
}

export default memo(NavigationMobile);
