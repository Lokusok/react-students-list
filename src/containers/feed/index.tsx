import { observer } from 'mobx-react-lite';

import { Box, Fab, Typography, Zoom } from '@mui/material';

import AdaptiveGrid from '@src/components/adaptive-grid';
import StudentCard from '@src/components/student-card';
import StudentsSkeleton from '@src/components/feed-skeleton/students-skeleton';

import PaginationWrapper from '../pagination-wrapper';

import { useStores } from '@src/hooks/use-stores';
import BasicTable from '@src/components/basic-table';
import produceEntries from '@src/utils/produce-entries';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/joy';
import makeStudentReadable from '@src/utils/make-student-readable';

function Feed() {
  const { studentsStore } = useStores();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const students = studentsStore.students;

  const renders = {
    studentItem: (student: TStudent) => (
      <StudentCard student={makeStudentReadable(student)} />
    ),
  };

  const handlers = {
    onSelectTableRow: (index: number) => {
      setSelectedRows((s) => {
        if (s.includes(index))
          return s.filter((existIndex) => existIndex !== index);

        return [...s, index];
      });
    },
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
              <>
                <Zoom in={Boolean(selectedRows.length)}>
                  <Tooltip title={'Удалить?'}>
                    <Fab
                      sx={{
                        position: 'absolute',
                        right: '50px',
                        bottom: '50px',
                      }}
                      size="large"
                      color="error"
                      aria-label="Удалить"
                    >
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </Zoom>

                <BasicTable
                  headers={[
                    'ID',
                    'Имя студента',
                    'Возраст студента',
                    'Роль студента',
                    'Примечания о студенте',
                  ]}
                  rows={produceEntries(
                    studentsStore.students,
                    ['id', 'name', 'age', 'role', 'notes'],
                    makeStudentReadable
                  )}
                  uidHeader={'ID'}
                  renderItemOn={'Имя студента'}
                  renderItem={(data) => (
                    <Link
                      to={`/students/${data.id}`}
                      state={{ from: location.pathname }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {data.title}
                    </Link>
                  )}
                  onSelectRow={handlers.onSelectTableRow}
                  selectedRows={selectedRows}
                />
              </>
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
