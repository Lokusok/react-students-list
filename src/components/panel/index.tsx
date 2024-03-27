import React from 'react';
import { Grid } from '@mui/material';

type TProps = {
  renderLeft: () => React.ReactNode;
  renderRight: () => React.ReactNode;
};

function Panel(props: TProps) {
  return (
    <Grid justifyContent={'space-between'} container spacing={4}>
      <Grid item xs={12} md={5}>
        {props.renderLeft()}
      </Grid>

      <Grid item xs={12} md={7}>
        {props.renderRight()}
      </Grid>
    </Grid>
  );
}

export default Panel;
