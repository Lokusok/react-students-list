import { memo, useState } from 'react';

import { TInputs } from '@src/shared/types';

import StudentForm from '@src/components/student-form';

function StudentCreate() {
  const [data, setData] = useState({
    'student-name': '',
    'student-role': 'default',
    'student-age': '',
    'student-notes': '',
  });
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

    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();

      console.log('Student:', data);
    },
  };

  return (
    <StudentForm
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
