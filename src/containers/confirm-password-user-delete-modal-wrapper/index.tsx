import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import ConfirmPasswordModal from '@src/components/confirm-password-modal';

import useStores from '@src/hooks/use-stores';

type TProps = {
  onClose: () => void;
};

function ConfirmPasswordUserDeleteModalWrapper(props: TProps) {
  const { sessionStore, snackbarsStore } = useStores();
  const navigate = useNavigate();

  const handlers = {
    onFormSubmit: async (data: { password: string }) => {
      if (!sessionStore.profile) {
        return snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Вы уже вышли из аккаунта',
        });
      }

      await sessionStore.confirmPassword(data.password);

      if (!sessionStore.error) {
        await sessionStore.deleteUser();
        await sessionStore.logout();

        navigate('/');

        props.onClose();
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
      <ConfirmPasswordModal
        {...props}
        onSubmit={handlers.onFormSubmit}
        isSubmitBtnDisabled={sessionStore.isWaitingDelete}
      />
    </>
  );
}

export default observer(ConfirmPasswordUserDeleteModalWrapper);
