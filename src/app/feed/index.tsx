import { memo } from 'react';
import { Helmet } from 'react-helmet';

import { Typography, Divider, Grid } from '@mui/material';

import Feed from '@src/containers/feed';
import ActiveRoleSelect from '@src/containers/active-role-select';
import ViewTabsChoice from '@src/containers/view-tabs-choice';
import useInit from '@src/hooks/use-init';
import { useStores } from '@src/hooks/use-stores';
import FeedHeader from '@src/containers/feed-header';

function FeedPage() {
  const { studentsStore } = useStores();

  useInit(() => {
    studentsStore.initParams();
  });

  return (
    <>
      <Helmet>
        <title>Список студентов</title>
      </Helmet>

      <FeedHeader />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Feed />
    </>
  );
}

export default memo(FeedPage);
