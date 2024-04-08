import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TInputs, TStudentData } from '@src/shared/types';

import StudentForm from '@src/components/student-form';
import studentsStore from '@src/store/students';

const initialData = {
  name: '',
  role: 'default',
  age: '',
  notes: '',
  avatar: null,
};

function StudentCreate() {
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

    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const student = {
        ...data,
        id: window.crypto.randomUUID(),
      };
      studentsStore.createStudent(student);
      setData({ ...initialData });
    },
  };

  return (
    <StudentForm
      title={'Добавить нового'}
      onSubmit={handlers.onSubmit}
      studentData={data}
      onChange={handlers.onChange}
      onExtraChange={handlers.onExtraChange}
      onAvatarChange={handlers.onAvatarChange}
      submitText={'Добавить'}
    />
  );
}

export default observer(StudentCreate);
