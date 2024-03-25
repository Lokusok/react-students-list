import { memo, useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';

import { Typography } from '@mui/material';

import AdaptiveGrid from '@src/components/adaptive-grid';
import StudentCard from '@src/components/student-card';
import StudentsSkeleton from '@src/components/main-skeleton/students-skeleton';

import { studentsQuery } from '@src/store/students/queries';

function Feed() {
  const students = useRecoilValueLoadable(studentsQuery);
  const studentsRefresher = useRecoilRefresher_UNSTABLE(studentsQuery);

  const renders = {
    studentItem: (student: TStudent) => <StudentCard student={student} />,
  };

  // Перезапрашиваем пользователей при монтировании
  useEffect(() => {
    studentsRefresher();
  }, [studentsRefresher]);

  if (students.state === 'hasValue') {
    return (
      <>
        {students.contents.length > 0 && (
          <AdaptiveGrid
            renderItem={renders.studentItem}
            items={students.contents}
            keyProp={'id'}
          />
        )}

        {!students.contents.length && (
          <Typography component="h4">Студенты не были найдены...</Typography>
        )}
      </>
    );
  }

  if (students.state === 'loading') {
    return <StudentsSkeleton />;
  }

  if (students.state === 'hasError') {
    return <Typography>Произошла ошибка. Повторите попытку позже.</Typography>;
  }
}

export default memo(Feed);
