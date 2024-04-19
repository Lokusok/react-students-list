import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Header from '@src/components/header';
import PageLayout from '@src/components/page-layout';

import AllModals from '@src/containers/all-modals';

import { useStores } from '@src/store';
import useInit from '@src/hooks/use-init';

function App() {
  const { studentsStore, sessionStore } = useStores();

  useInit(() => {
    sessionStore.remind();
  });

  useEffect(() => {
    studentsStore.fetchStudents();
  }, [studentsStore, studentsStore.activeRole, studentsStore.currentPage]);

  return (
    <PageLayout head={<Header />}>
      <Outlet />

      <AllModals />
    </PageLayout>
  );
}

export default observer(App);
