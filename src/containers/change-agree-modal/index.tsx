import { useState } from 'react';

import { observer } from 'mobx-react-lite';

import ChangeModal from '@src/components/change-modal';
import { useStores } from '@src/hooks/use-stores';

import { TInputs } from '@src/shared/types';

type TProps = {
  onClose: () => void;
};

function ChangeAgreeModal(props: TProps) {
  const { onClose } = props;

  const { studentsStore, snackbarsStore } = useStores();

  const student = studentsStore.students.find((s) =>
    studentsStore.activeStudents.includes(s.id)
  );
  const [data, setData] = useState<TStudent>(student!);

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

      await studentsStore.updateStudent(student!.id, formData);

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
      onClose();

      form.reset();
    },
  };

  const options = {
    isDisabled:
      !student ||
      (studentsStore.isFetchingUpdate &&
        studentsStore.activeStudents.includes(student.id)),
  };

  return (
    <ChangeModal
      studentData={data}
      onReject={onClose}
      onChange={handlers.onChange}
      onSubmit={handlers.onSubmit}
      onExtraChange={handlers.onExtraChange}
      onAvatarChange={handlers.onAvatarChange}
      disabled={options.isDisabled}
    />
  );
}

export default observer(ChangeAgreeModal);
