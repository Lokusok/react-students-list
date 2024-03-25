import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import StudentInfo from '@src/components/student-info';
import { studentsQuery } from '@src/store/students/queries';

import { Typography } from '@mui/material';
import ApiService from '@src/api';

type TProps = {
  id: string | number;
};

function StudentWrapper(props: TProps) {
  const students = useRecoilValue(studentsQuery);
  const student = students.find((s) => s.id == props.id);

  console.log('id:', props.id);
  console.log('students:', students);

  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    deleteStudent: () => {
      ApiService.deleteStudent(props.id);
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
