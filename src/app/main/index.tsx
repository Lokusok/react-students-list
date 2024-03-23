import { memo } from 'react';
import { Helmet } from 'react-helmet';

import { Typography, Divider, Stack } from '@mui/material';

import Feed from '@src/containers/feed';
import Select from '@src/components/select';
import { studentsRoles } from '@src/shared/data/students-roles';

function Main() {
  const rolesOptions = [
    {
      value: '*',
      renderValue: 'Все',
    },
    ...studentsRoles,
  ];

  return (
    <>
      <Helmet>
        <title>Список учеников</title>
      </Helmet>

      <Stack justifyContent={['space-between']} direction="row">
        <Typography component="h2" fontSize={26} fontWeight={700}>
          Список всех учеников
        </Typography>

        <Select value={'*'} options={rolesOptions} />
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Feed />
    </>
  );
}

export default memo(Main);
