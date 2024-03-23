import { memo } from 'react';

import { Avatar, ListItem as ListItemMui, Typography, ListItemAvatar } from '@mui/material';

type TProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function ListItem(props: TProps) {
  return (
    <ListItemMui sx={{ display: 'flex', columnGap: '15px' }}>
      <ListItemAvatar sx={{ minWidth: 35, width: 35, height: 35 }}>
        <Avatar sx={{ width: 35, height: 35 }}>{props.icon}</Avatar>
      </ListItemAvatar>

      <Typography fontSize={16}>{props.children}</Typography>
    </ListItemMui>
  );
}

export default memo(ListItem);
