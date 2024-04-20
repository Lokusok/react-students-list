import { observer } from 'mobx-react-lite';

import LoginActions from '@src/components/login-actions';

import { useStores } from '@src/hooks/use-stores';

function LoginActionsWrapper() {
  const { modalsStore, sessionStore, snackbarsStore } = useStores();

  const callbacks = {
    showLoginModal: () => modalsStore.addActiveModal('login'),
    showRegisterModal: () => modalsStore.addActiveModal('register'),
    logoutSession: async () => {
      await sessionStore.logout();

      if (!sessionStore.error) {
        snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Выход из аккаунта выполнен успешно!',
        });
      } else {
        snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Произошла ошибка при попытке выхода из аккаунта...',
        });
      }
    },
  };

  return (
    <LoginActions
      isDisabled={sessionStore.waiting}
      onLogoutClick={callbacks.logoutSession}
      onLoginClick={callbacks.showLoginModal}
      onRegisterClick={callbacks.showRegisterModal}
      isLogined={Boolean(sessionStore.profile)}
    />
  );
}

export default observer(LoginActionsWrapper);
