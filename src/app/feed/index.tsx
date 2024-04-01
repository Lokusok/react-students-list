import { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Typography, Divider, Stack } from '@mui/material';

import Feed from '@src/containers/feed';
import ActiveRoleSelect from '@src/containers/active-role-select';
import studentsStore from '@src/store/students';

function FeedPage() {
  useEffect(() => {
    studentsStore.fetchStudents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Список студентов</title>
      </Helmet>

      <Stack
        flexWrap={'wrap'}
        justifyContent={['space-between']}
        direction="row"
      >
        <Typography component="h2" fontSize={26} fontWeight={700}>
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
