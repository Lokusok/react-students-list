import { memo } from 'react';

import ListItem from './list-item';

import { List, Paper } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const items = [
  {
    text: 'Отличник',
    key: 'excellent',
    icon: <CheckBoxIcon />,
  },
  {
    text: 'Хорошист',
    key: 'good',
    icon: <AccessTimeFilledIcon />,
  },
  {
    text: 'Троечник',
    key: 'bad',
    icon: <EventBusyIcon />,
  },
];

type TProps = {
  totals: Record<string, string | number>;
};

function Total(props: TProps) {
  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <List>
        {items.map((item) => (
          <ListItem key={item.key} icon={item.icon}>{`${item.text} ${
            props.totals[item.key as keyof typeof props.totals]
          }`}</ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default memo(Total);
