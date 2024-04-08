import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import StudentInfo from '@src/components/student-info';

import { Typography } from '@mui/material';
import { TInputs, TStudentData } from '@src/shared/types';
import SuccessSnackbar from '@src/components/success-snackbar';

import { useStores } from '@src/store';

type TProps = {
  id: string | number;
};

function StudentWrapper(props: TProps) {
  const { studentsStore } = useStores();

  const navigate = useNavigate();
  const location = useLocation();

  const student = studentsStore.students.find((s) => s.id == props.id);
  const [data, setData] = useState<TStudentData>(student!);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const callbacks = {
    deleteStudent: async () => {
      if (!student) return;

      await studentsStore.deleteStudent(student.id);
      navigate(location.state.from ?? '/');
    },

    updateStudent: async () => {
      if (!student) return;

      await studentsStore.updateStudent(student!.id, data);
      setIsSnackbarVisible(true);
    },
  };

  const handlers = {
    onChange: (e: React.ChangeEvent<TInputs>) => {
      setData((prevData) => ({
        ...prevData,
        [e.target.id]: e.target.value,
      }));
    },

    onExtraChange: (id: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    },

    onAvatarChange: (val: File) => {
      setData((prevData) => ({
        ...prevData,
        avatar: val,
      }));
    },

    onSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newStudentData = {
        ...data,
      };

      await callbacks.updateStudent();
      setData({ ...newStudentData });
    },
  };

  return (
    <>
      {student && (
        <StudentInfo
          editableData={data}
          student={student}
          deleteStudent={callbacks.deleteStudent}
          updateStudent={callbacks.updateStudent}
          onChange={handlers.onChange}
          onSubmit={handlers.onSubmit}
          onExtraChange={handlers.onExtraChange}
          onAvatarChange={handlers.onAvatarChange}
          renderSuccessSnackbar={() => (
            <SuccessSnackbar
              isOpen={isSnackbarVisible}
              setIsOpen={setIsSnackbarVisible}
              buttonText={'Понятно'}
              bodyText={'Студент обновлён успешно!'}
            />
          )}
        />
      )}
      {!student && <Typography>Информации о студенте не найдено...</Typography>}
    </>
  );
}

export default observer(StudentWrapper);
