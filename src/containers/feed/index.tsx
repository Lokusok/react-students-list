import { memo } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import { Typography } from '@mui/material';

import AdaptiveGrid from '@src/components/adaptive-grid';
import StudentCard from '@src/components/student-card';
import StudentsSkeleton from '@src/components/main-skeleton/students-skeleton';

import { studentsQuery } from '@src/store/students/queries';

function Feed() {
  const students = useRecoilValueLoadable(studentsQuery);

  const renders = {
    studentItem: (student: TStudent) => <StudentCard student={student} />,
  };

  if (students.state === 'hasValue') {
    return (
      <AdaptiveGrid
        renderItem={renders.studentItem}
        items={students.contents}
        keyProp={'id'}
      />
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
