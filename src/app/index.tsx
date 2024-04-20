import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Header from '@src/components/header';
import PageLayout from '@src/components/page-layout';

import AllModals from '@src/containers/all-modals';
import AllSnackbars from '@src/containers/all-snackbars';

import { useStores } from '@src/hooks/use-stores';
import useInit from '@src/hooks/use-init';

function App() {
  const { studentsStore, sessionStore } = useStores();

  useInit(() => {
    sessionStore.remind();
  });

  useEffect(() => {
    if (sessionStore.profile) {
      studentsStore.fetchStudents();
    }
  }, [
    studentsStore,
    studentsStore.activeRole,
    studentsStore.currentPage,
    sessionStore.profile,
  ]);

  return (
    <PageLayout head={<Header />}>
      <Outlet />

      <AllModals />
      <AllSnackbars />
    </PageLayout>
  );
}

export default observer(App);
