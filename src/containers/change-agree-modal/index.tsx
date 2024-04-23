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

  const student = studentsStore.students.find(
    (s) => s.id == studentsStore.activeStudent
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
      onClose();
    },
  };

  return (
    <ChangeModal
      studentData={data}
      onReject={onClose}
      onChange={handlers.onChange}
      onSubmit={handlers.onSubmit}
      onExtraChange={handlers.onExtraChange}
      onAvatarChange={handlers.onAvatarChange}
    />
  );
}

export default observer(ChangeAgreeModal);
