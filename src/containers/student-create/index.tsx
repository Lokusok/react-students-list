import { memo, useState } from 'react';

import { TInputs } from '@src/shared/types';

import StudentForm from '@src/components/student-form';
import ApiService from '@src/api';

const initialData = {
  name: '',
  role: 'default',
  age: '',
  notes: '',
};

function StudentCreate() {
  const [data, setData] = useState(() => ({ ...initialData }));
  const [avatar, setAvatar] = useState<File | null | undefined>(null);

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

    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setAvatar(e.target.files?.item(0));
    },

    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const student = {
        ...data,
        id: window.crypto.randomUUID(),
      };
      ApiService.addStudent(student);
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
      avatar={avatar}
    />
  );
}

export default memo(StudentCreate);
