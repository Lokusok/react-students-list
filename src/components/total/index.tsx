import { memo } from 'react';

import { useRecoilValue } from 'recoil';

import ListItem from './list-item';
import { rolesCountSelector } from '@src/store/students/selectors';

import { List, Paper } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const items = [
  {
    text: 'Отличник',
    icon: <CheckBoxIcon />,
  },
  {
    text: 'Хорошист',
    icon: <AccessTimeFilledIcon />,
  },
  {
    text: 'Троечник',
    icon: <EventBusyIcon />,
  },
];

function Total() {
  const totals = useRecoilValue(rolesCountSelector);

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <List>
        {items.map((item, index) => (
          <ListItem key={item.text + index} icon={item.icon}>{`${item.text} ${
            totals[item.text as keyof typeof totals]
          }`}</ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default memo(Total);
