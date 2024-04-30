import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TInputs, TStudentData } from '@src/shared/types';

import StudentForm from '@src/components/student-form';

import useStores from '@src/hooks/use-stores';

const initialData = {
  name: '',
  role: 'default',
  age: 15,
  notes: '',
  avatar: null,
};

function StudentCreate() {
  const { studentsStore, snackbarsStore } = useStores();

  const [data, setData] = useState<TStudentData>(() => ({ ...initialData }));

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

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      formData.append('id', crypto.randomUUID());

      await studentsStore.createStudent(formData);

      if (studentsStore.error) {
        return snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Ошибка при создании студента',
        });
      }

      snackbarsStore.setSuccessSnack({
        buttonText: 'Понятно',
        bodyText: 'Студент успешно создан',
      });
      setData({ ...initialData });
      form.reset();
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
    </>
  );
}

export default observer(StudentCreate);
