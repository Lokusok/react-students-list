import { observer } from 'mobx-react-lite';

import { Box, Typography } from '@mui/material';

import AdaptiveGrid from '@src/components/adaptive-grid';
import StudentCard from '@src/components/student-card';
import StudentsSkeleton from '@src/components/feed-skeleton/students-skeleton';

import PaginationWrapper from '../pagination-wrapper';

import { useStores } from '@src/store';

function Feed() {
  const { studentsStore } = useStores();

  const students = studentsStore.students;

  const renders = {
    studentItem: (student: TStudent) => <StudentCard student={student} />,
  };

  if (!studentsStore.isLoading) {
    return (
      <>
        {students.length > 0 && (
          <>
            <AdaptiveGrid
              renderItem={renders.studentItem}
              items={students}
              keyProp={'id'}
            />

            <Box sx={{ display: 'flex', mt: 5 }} justifyContent={'flex-end'}>
              <PaginationWrapper />
            </Box>
          </>
        )}

        {!students.length && (
          <>
            <Typography component="h4">Студенты не были найдены...</Typography>

            {studentsStore.totalPages > 0 && (
              <Box sx={{ display: 'flex', mt: 5 }} justifyContent={'flex-end'}>
                <PaginationWrapper />
              </Box>
            )}
          </>
        )}
      </>
    );
  }

  if (studentsStore.isLoading) {
    return <StudentsSkeleton />;
  }

  if (studentsStore.error) {
    return <Typography>Произошла ошибка. Повторите попытку позже.</Typography>;
  }
}

export default observer(Feed);
