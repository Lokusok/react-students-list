import Header from '@src/components/header';
import PageLayout from '@src/components/page-layout';
import { memo } from 'react';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <PageLayout head={<Header />}>
      <Outlet />
    </PageLayout>
  );
}

export default memo(App);
