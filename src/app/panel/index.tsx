import { memo } from 'react';

import { Helmet } from 'react-helmet';

import { Grid } from '@mui/material';

import TotalObserver from '@src/containers/total-observer';
import StudentCreate from '@src/containers/student-create';

import { default as PanelView } from '@src/components/panel';

function Panel() {
  return (
    <>
      <Helmet>
        <title>Панель управления</title>
      </Helmet>

      <Grid justifyContent={'space-between'} container spacing={4}>
        <Grid item xs={12} md={5}>
          <TotalObserver />
        </Grid>

        <Grid item xs={12} md={7}>
          <StudentCreate />
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Panel);
