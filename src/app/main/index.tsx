import { memo } from 'react';
import { Helmet } from 'react-helmet';

import { Typography, Divider, Stack } from '@mui/material';

import Feed from '@src/containers/feed';
import ActiveRoleSelect from '@src/containers/active-role-select';

function Main() {
  return (
    <>
      <Helmet>
        <title>Список учеников</title>
      </Helmet>

      <Stack
        flexWrap={'wrap'}
        justifyContent={['space-between']}
        direction="row"
      >
        <Typography component="h2" fontSize={26} fontWeight={700}>
          Список всех учеников
        </Typography>

        <ActiveRoleSelect />
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Feed />
    </>
  );
}

export default memo(Main);
