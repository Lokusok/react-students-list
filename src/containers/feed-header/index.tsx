import { memo } from 'react';

import { Grid, Typography } from '@mui/material';
import ViewTabsChoice from '../view-tabs-choice';
import ActiveRoleSelect from '../active-role-select';
import Title from '@src/components/title';

function FeedHeader() {
  return (
    <Grid container rowGap={{ xs: '15px' }} justifyContent={'space-between'}>
      <Grid
        item
        sx={{
          display: { xs: 'flex', lg: 'block' },
          justifyContent: 'center',
        }}
        xs={12}
        md={6}
        lg={'auto'}
      >
        <Title
          textAlign={{ xs: 'center', lg: 'start' }}
          component="h2"
          fontSize={26}
          fontWeight={700}
        >
          Список всех студентов
        </Title>
      </Grid>

      <Grid
        item
        sx={{
          display: { xs: 'flex', lg: 'block' },
          justifyContent: 'center',
        }}
        xs={12}
        md={6}
        lg={'auto'}
      >
        <ViewTabsChoice />
      </Grid>

      <Grid
        item
        sx={{
          display: { xs: 'flex', lg: 'block' },
          justifyContent: 'center',
        }}
        xs={12}
        lg={'auto'}
      >
        <ActiveRoleSelect />
      </Grid>
    </Grid>
  );
}

export default memo(FeedHeader);
