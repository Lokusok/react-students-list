import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import StudentInfo from '@src/components/student-info';

import { Typography } from '@mui/material';
import studentsStore from '@src/store/students-mobx';

type TProps = {
  id: string | number;
};

function StudentWrapper(props: TProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const student = studentsStore.students.find((s) => s.id == props.id);

  const callbacks = {
    deleteStudent: async () => {
      if (!student) return;

      await studentsStore.deleteStudent(student.id);
      navigate(location.state.from ?? '/');
    },
  };

  return (
    <>
      {student && (
        <StudentInfo
          student={student}
          deleteStudent={callbacks.deleteStudent}
        />
      )}
      {!student && <Typography>Информации о студенте не найдено...</Typography>}
    </>
  );
}

export default memo(StudentWrapper);
