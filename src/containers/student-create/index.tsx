import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TInputs, TStudentData } from '@src/shared/types';

import StudentForm from '@src/components/student-form';
import SuccessSnackbar from '@src/components/success-snackbar';

import { useStores } from '@src/store';

const initialData = {
  name: '',
  role: 'default',
  age: '',
  notes: '',
  avatar: null,
};

type TSnackbar = {
  buttonText: string;
  bodyText: string;
};

function StudentCreate() {
  const { studentsStore } = useStores();

  const [data, setData] = useState<TStudentData>(() => ({ ...initialData }));
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbar, setSnackbar] = useState<TSnackbar | null>(null);

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

    onAvatarChange: (val: string) => {
      setData((prevData) => ({
        ...prevData,
        avatar: val,
      }));
    },

    onSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const student = {
        ...data,
        id: window.crypto.randomUUID(),
      };
      await studentsStore.createStudent(student);
      setData({ ...initialData });

      setIsSnackbarVisible(true);
      setSnackbar({
        buttonText: 'Понятно',
        bodyText: 'Студент успешно добавлен!',
      });
    },
  };

  return (
    <>
      <StudentForm
        title={'Добавить нового'}
        onSubmit={handlers.onSubmit}
        studentData={data}
        onChange={handlers.onChange}
        onExtraChange={handlers.onExtraChange}
        onAvatarChange={handlers.onAvatarChange}
        submitText={'Добавить'}
        disabled={studentsStore.isLoading}
      />

      <SuccessSnackbar
        isOpen={isSnackbarVisible}
        onUnmount={() => setSnackbar(null)}
        setIsOpen={setIsSnackbarVisible}
        buttonText={snackbar?.buttonText}
        bodyText={snackbar?.bodyText}
      />
    </>
  );
}

export default observer(StudentCreate);
