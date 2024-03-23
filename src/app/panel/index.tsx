import { memo } from 'react';

import { Helmet } from 'react-helmet';

import { Grid } from '@mui/material';

import Total from '@src/components/total';
import NewForm from '@src/components/new-form';

function Panel() {
  return (
    <>
      <Helmet>
        <title>Панель управления</title>
      </Helmet>

      <Grid justifyContent={'space-between'} container spacing={4}>
        <Grid item xs={12} md={5}>
          <Total />
        </Grid>

        <Grid item xs={12} md={7}>
          <NewForm />
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Panel);
