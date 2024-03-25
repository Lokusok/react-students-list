import { memo } from 'react';

import ListItem from './list-item';

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

type TProps = {
  totals: Record<string, number>;
};

function Total(props: TProps) {
  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <List>
        {items.map((item, index) => (
          <ListItem key={item.text + index} icon={item.icon}>{`${item.text} ${
            props.totals[item.text as keyof typeof props.totals]
          }`}</ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default memo(Total);
