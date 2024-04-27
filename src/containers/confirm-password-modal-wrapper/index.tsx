import { memo } from 'react';

import ConfirmPasswordModal from '@src/components/confirm-password-modal';

import { useStores } from '@src/hooks/use-stores';

type TProps = {
  onClose: () => void;
};

function ConfirmPasswordModalWrapper(props: TProps) {
  const { sessionStore, snackbarsStore } = useStores();

  const handlers = {
    onFormSubmit: async (data: { password: string }) => {
      await sessionStore.confirmPassword(data.password);

      if (!sessionStore.error) {
        props.onClose();
        await sessionStore.deleteUser();
        return snackbarsStore.setInfoSnack({
          buttonText: 'Понятно',
          bodyText: 'Пользователь удалён',
        });
      }

      snackbarsStore.setErrorSnack({
        buttonText: 'Понятно',
        bodyText: 'Ошибка при удалении пользователя',
      });
    },
  };

  return (
    <>
      <ConfirmPasswordModal {...props} onSubmit={handlers.onFormSubmit} />
    </>
  );
}

export default memo(ConfirmPasswordModalWrapper);
