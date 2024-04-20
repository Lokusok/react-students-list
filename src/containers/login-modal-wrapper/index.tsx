import { observer } from 'mobx-react-lite';

import LoginModal from '@src/components/login-modal';

import { useStores } from '@src/store';
import { TUserLogin } from '@src/shared/types';

type TProps = {
  onClose: () => void;
};

function LoginModalWrapper(props: TProps) {
  const { sessionStore, modalsStore, snackbarsStore } = useStores();

  const handlers = {
    onFormSubmit: async (data: TUserLogin) => {
      await sessionStore.loginUser(data);

      if (!sessionStore.error) {
        snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Вход в аккаунт выполнен успешно!',
        });
        modalsStore.removeActiveModal('login');
      } else {
        snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Произошла ошибка при входе в аккаунт...',
        });
      }
    },
  };

  return (
    <LoginModal
      {...props}
      onFormSubmit={handlers.onFormSubmit}
      errorMessage={sessionStore.error}
      isSubmitDisabled={sessionStore.waiting}
    />
  );
}

export default observer(LoginModalWrapper);
