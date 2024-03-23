import { memo } from 'react';

import ListItem from './list-item';

import { List, Paper } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EventBusyIcon from '@mui/icons-material/EventBusy';

function Total() {
  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <List>
        <ListItem icon={<CheckBoxIcon />}>Отличник: 1</ListItem>
        <ListItem icon={<AccessTimeFilledIcon />}>Хорошист: 4</ListItem>
        <ListItem icon={<EventBusyIcon />}>Троечник: 1</ListItem>
      </List>
    </Paper>
  );
}

export default memo(Total);
