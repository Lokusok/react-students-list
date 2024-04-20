import { observer } from 'mobx-react-lite';

import RegisterModal from '@src/components/register-modal';
import { TUserRegister } from '@src/shared/types';
import { useStores } from '@src/store';

type TProps = {
  onClose: () => void;
};

function RegisterModalWrapper(props: TProps) {
  const { sessionStore, modalsStore, snackbarsStore } = useStores();

  const handlers = {
    onFormSubmit: async (data: TUserRegister) => {
      await sessionStore.registerUser(data);

      if (!sessionStore.error) {
        snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Регистрация прошла успешно!',
        });

        modalsStore.removeActiveModal('register');
      } else {
        snackbarsStore.setErrorSnack({
          buttonText: 'Понятно',
          bodyText: 'Произошла ошибка в процессе регистрации...',
        });
      }
    },
  };

  return (
    <>
      <RegisterModal
        {...props}
        onFormSubmit={handlers.onFormSubmit}
        errorMessage={sessionStore.error}
        isSubmitDisabled={sessionStore.waiting}
      />
    </>
  );
}

export default observer(RegisterModalWrapper);
