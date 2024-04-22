import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import StudentInfo from '@src/components/student-info';

import { Typography } from '@mui/material';
import { TInputs, TStudentData } from '@src/shared/types';

import { useStores } from '@src/hooks/use-stores';
import makeStudentReadable from '@src/utils/make-student-readable';

type TProps = {
  id: string | number;
};

function StudentWrapper(props: TProps) {
  const { id } = props;

  const { studentsStore, modalsStore, snackbarsStore } = useStores();

  const navigate = useNavigate();
  const location = useLocation();

  const student = studentsStore.students.find((s) => s.id == id);
  const studentReadable = makeStudentReadable(student as TStudent);
  const [data, setData] = useState<TStudentData>(student!);

  const callbacks = {
    updateStudent: async () => {
      if (!student) return;

      await studentsStore.updateStudent(student!.id, data);

      if (studentsStore.error) {
        return snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Ошибка при обновлении студента',
        });
      }

      snackbarsStore.setSuccessSnack({
        buttonText: 'Понятно',
        bodyText: 'Студент успешно обновлён!',
      });
    },

    openModalDeleteAgree: () => {
      if (!student) return;

      console.log('Открываю модалку для подтверждение удаления');
      modalsStore.addActiveModal('deleteAgree');
      studentsStore.setActiveStudent(student.id);
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
          student={studentReadable}
          updateStudent={callbacks.updateStudent}
          onChange={handlers.onChange}
          onSubmit={handlers.onSubmit}
          onExtraChange={handlers.onExtraChange}
          onAvatarChange={handlers.onAvatarChange}
          onDeleteBtnClick={callbacks.openModalDeleteAgree}
        />
      )}
      {!student && <Typography>Информации о студенте не найдено...</Typography>}
    </>
  );
}

export default observer(StudentWrapper);
