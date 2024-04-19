import { observer } from 'mobx-react-lite';

import RegisterModal from '@src/components/register-modal';
import { TUserRegister } from '@src/shared/types';
import { useStores } from '@src/store';

type TProps = {
  onClose: () => void;
};

function RegisterModalWrapper(props: TProps) {
  const { sessionStore } = useStores();

  const handlers = {
    onFormSubmit: (data: TUserRegister) => {
      console.log('Submitting: ', data);
      sessionStore.registerUser(data);
    },
  };

  console.log({ inContainer: sessionStore.error });

  return (
    <RegisterModal
      onFormSubmit={handlers.onFormSubmit}
      errorMessage={sessionStore.error}
      {...props}
    />
  );
}

export default observer(RegisterModalWrapper);
