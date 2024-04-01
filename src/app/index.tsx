import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Header from '@src/components/header';
import PageLayout from '@src/components/page-layout';
import studentsStore from '@src/store/students';

function App() {
  useEffect(() => {
    studentsStore.fetchStudents();
  }, [studentsStore.activeRole, studentsStore.currentPage]);

  return (
    <PageLayout head={<Header />}>
      <Outlet />
    </PageLayout>
  );
}

export default observer(App);
