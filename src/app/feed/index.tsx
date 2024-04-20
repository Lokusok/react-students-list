import { memo } from 'react';
import { Helmet } from 'react-helmet';

import { Typography, Divider, Stack } from '@mui/material';

import Feed from '@src/containers/feed';
import ActiveRoleSelect from '@src/containers/active-role-select';

function FeedPage() {
  return (
    <>
      <Helmet>
        <title>Список студентов</title>
      </Helmet>

      <Stack
        rowGap={'10px'}
        flexWrap={'wrap'}
        justifyContent={{ xs: 'center', md: 'space-between' }}
        direction="row"
      >
        <Typography
          textAlign={{ xs: 'center', md: 'start' }}
          component="h2"
          fontSize={26}
          fontWeight={700}
        >
          Список всех студентов
        </Typography>

        <ActiveRoleSelect />
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Feed />
    </>
  );
}

export default memo(FeedPage);
