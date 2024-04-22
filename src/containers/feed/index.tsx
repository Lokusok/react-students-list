import { observer } from 'mobx-react-lite';

import { Box, Typography } from '@mui/material';

import AdaptiveGrid from '@src/components/adaptive-grid';
import StudentCard from '@src/components/student-card';
import StudentsSkeleton from '@src/components/feed-skeleton/students-skeleton';

import PaginationWrapper from '../pagination-wrapper';

import { useStores } from '@src/hooks/use-stores';
import BasicTable from '@src/components/basic-table';
import produceEntries from '@src/utils/produce-entries';

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
            {studentsStore.viewStrategy === 'grid' ? (
              <AdaptiveGrid
                renderItem={renders.studentItem}
                items={students}
                keyProp={'id'}
              />
            ) : (
              <BasicTable
                headers={[
                  'ID',
                  'Имя студента',
                  'Возраст студента',
                  'Роль студента',
                  'Примечания о студенте',
                ]}
                rows={produceEntries(studentsStore.students, [
                  'id',
                  'name',
                  'age',
                  'role',
                  'notes',
                ])}
                uidHeader={'ID'}
              />
            )}

            <Box sx={{ display: 'flex', mt: 5 }} justifyContent={'flex-end'}>
              <PaginationWrapper />
            </Box>
          </>
        )}

        {!students.length && (
          <>
            <Typography
              textAlign={{ xs: 'center', md: 'start' }}
              component="h4"
            >
              Студенты не были найдены...
            </Typography>

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
