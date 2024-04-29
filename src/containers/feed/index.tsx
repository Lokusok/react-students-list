import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom';

import AdaptiveGrid from '@src/components/adaptive-grid';
import StudentCard from '@src/components/student-card';
import GridSkeleton from '@src/components/skeletons/feed-skeleton/grid-skeleton';
import TableSkeleton from '@src/components/skeletons/feed-skeleton/table-skeleton';
import BasicTable from '@src/components/basic-table';

import { Box, Fab, Stack, Typography, Zoom } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Tooltip } from '@mui/joy';

import PaginationWrapper from '../pagination-wrapper';

import produceEntries from '@src/utils/produce-entries';
import makeStudentReadable from '@src/utils/make-student-readable';

import { useStores } from '@src/hooks/use-stores';

function Feed() {
  const { studentsStore, snackbarsStore } = useStores();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const students = studentsStore.students;

  const fetchingParams = {
    isFetchingUpdate: studentsStore.isFetchingUpdate,
    activeStudents: studentsStore.activeStudents,
  };

  const renders = {
    studentItem: (student: TStudent) => {
      const isFavouriteBtnDisabled =
        fetchingParams.isFetchingUpdate &&
        fetchingParams.activeStudents.includes(student.id);

      return (
        <StudentCard
          isFavouriteBtnDisabled={isFavouriteBtnDisabled}
          onFavouriteAdd={callbacks.addToFavourite}
          student={makeStudentReadable(student)}
        />
      );
    },
  };

  const handlers = {
    onSelectTableRow: (id: string) => {
      setSelectedRows((s) => {
        if (s.includes(id)) return s.filter((existId) => existId !== id);

        return [...s, id];
      });
    },
  };

  const callbacks = {
    resetSelectedRows: () => setSelectedRows([]),
    deleteSelectedRows: async () => {
      await studentsStore.deleteStudents(selectedRows);

      if (studentsStore.error) {
        return snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Ошибка при удалении',
        });
      }

      snackbarsStore.setSuccessSnack({
        buttonText: 'Понятно',
        bodyText: 'Удалено успешно',
      });
    },

    addToFavourite: async (student: TStudent) => {
      await studentsStore.toggleFavourite(student.id);

      if (!studentsStore.error) {
        return snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Студент обновлён',
        });
      }

      snackbarsStore.setErrorSnack({
        buttonText: 'Понятно',
        bodyText: 'Произошла ошибка...',
      });
    },
  };

  const options = {
    isActionsDisabled:
      studentsStore.isFetchingDelete || selectedRows.length === 0,
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
                  <Stack
                    direction="row"
                    alignItems={'center'}
                    spacing={2}
                    sx={{
                      position: 'absolute',
                      right: '50px',
                      bottom: '50px',
                    }}
                  >
                    <Tooltip title={'Удалить?'}>
                      <Fab
                        onClick={callbacks.deleteSelectedRows}
                        size="large"
                        color="error"
                        aria-label="Удалить"
                        disabled={options.isActionsDisabled}
                      >
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>

                    <Fab
                      onClick={callbacks.resetSelectedRows}
                      variant="extended"
                      color="primary"
                      disabled={options.isActionsDisabled}
                    >
                      <CleaningServicesIcon sx={{ mr: 1 }} />
                      Очистить
                    </Fab>
                  </Stack>
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
                  disabled={studentsStore.isFetchingDelete}
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
    switch (studentsStore.viewStrategy) {
      case 'grid':
        return <GridSkeleton />;
      case 'table':
        return <TableSkeleton />;
    }
  }

  if (studentsStore.error) {
    return <Typography>Произошла ошибка. Повторите попытку позже.</Typography>;
  }
}

export default observer(Feed);
