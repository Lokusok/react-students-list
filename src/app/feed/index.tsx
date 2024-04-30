import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react-lite';

import { Divider } from '@mui/material';

import Feed from '@src/containers/feed';
import FeedHeader from '@src/containers/feed-header';

import useStores from '@src/hooks/use-stores';
import useInit from '@src/hooks/use-init';

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

export default observer(FeedPage);
