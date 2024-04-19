import { observer } from 'mobx-react-lite';

import RegisterModal from '@src/components/register-modal';
import { TUserRegister } from '@src/shared/types';
import { useStores } from '@src/store';

type TProps = {
  onClose: () => void;
};

function RegisterModalWrapper(props: TProps) {
  const { sessionStore, modalsStore } = useStores();

  const handlers = {
    onFormSubmit: async (data: TUserRegister) => {
      console.log('Submitting: ', data);
      await sessionStore.registerUser(data);
      modalsStore.removeActiveModal('register');
    },
  };

  console.log({ inContainer: sessionStore.error });

  return (
    <RegisterModal
      {...props}
      onFormSubmit={handlers.onFormSubmit}
      errorMessage={sessionStore.error}
      isSubmitDisabled={sessionStore.waiting}
    />
  );
}

export default observer(RegisterModalWrapper);
