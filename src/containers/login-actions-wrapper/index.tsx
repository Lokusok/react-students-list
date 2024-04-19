import { observer } from 'mobx-react-lite';

import LoginActions from '@src/components/login-actions';

import { useStores } from '@src/store';

function LoginActionsWrapper() {
  const { modalsStore, sessionStore } = useStores();

  const callbacks = {
    showLoginModal: () => modalsStore.addActiveModal('login'),
    showRegisterModal: () => modalsStore.addActiveModal('register'),
    logoutSession: () => sessionStore.logout(),
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
