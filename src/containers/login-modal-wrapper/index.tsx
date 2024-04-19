import { observer } from 'mobx-react-lite';

import LoginModal from '@src/components/login-modal';

import { useStores } from '@src/store';
import { TUserLogin } from '@src/shared/types';

type TProps = {
  onClose: () => void;
};

function LoginModalWrapper(props: TProps) {
  const { sessionStore, modalsStore } = useStores();

  const handlers = {
    onFormSubmit: async (data: TUserLogin) => {
      console.log('Submitting on login: ', data);
      await sessionStore.loginUser(data);

      if (!sessionStore.error) {
        modalsStore.removeActiveModal('login');
      }
    },
  };

  console.log({ inContainerLogin: sessionStore.error });

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
