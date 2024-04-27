import { memo } from 'react';

import ListItem from './list-item';

import { List, Paper } from '@mui/material';

import GppGoodIcon from '@mui/icons-material/GppGood';
import TokenIcon from '@mui/icons-material/Token';
import CellTowerIcon from '@mui/icons-material/CellTower';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const items = [
  {
    text: 'Отличник',
    key: 'excellent',
    icon: <GppGoodIcon />,
  },
  {
    text: 'Хорошист',
    key: 'good',
    icon: <TokenIcon />,
  },
  {
    text: 'Троечник',
    key: 'normal',
    icon: <CellTowerIcon />,
  },
  {
    text: 'Двоечник',
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
