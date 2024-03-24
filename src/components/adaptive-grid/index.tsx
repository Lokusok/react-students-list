import { memo } from 'react';

import { Grid } from '@mui/material';

type TProps = {
  items: any[];
  renderItem: (student: any) => any;
  keyProp?: string;
};

function AdaptiveGrid(props: TProps) {
  return (
    <Grid container spacing={2}>
      {props.items.map((item, index) => (
        <Grid
          item
          key={!!item ? item[props.keyProp || 'id'] : index}
          xs={12}
          md={6}
          lg={4}
        >
          {props.renderItem(item)}
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(AdaptiveGrid);
