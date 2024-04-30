import { observer } from 'mobx-react-lite';

import RegisterModal from '@src/components/register-modal';

import useStores from '@src/hooks/use-stores';

import { TUserRegister } from '@src/shared/types';

type TProps = {
  onClose: () => void;
};

function RegisterModalWrapper(props: TProps) {
  const { sessionStore, modalsStore, snackbarsStore } = useStores();

  const handlers = {
    onFormSubmit: async (data: TUserRegister) => {
      await sessionStore.registerUser(data);

      if (!sessionStore.error) {
        snackbarsStore.setInfoSnack({
          buttonText: 'Понятно',
          bodyText: 'Письмо с подтверждением отправлено на почту',
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
