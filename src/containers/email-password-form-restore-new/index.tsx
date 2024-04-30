import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { Box } from '@mui/joy';

import Title from '@src/components/title';
import EmailPasswordFormNew from '@src/components/email-password-form-new';

import { useStores } from '@src/hooks/use-stores';

import { TUserMainLogin } from '@src/shared/types';

function EmailPasswordFormRestoreNew() {
  const { sessionStore, snackbarsStore } = useStores();
  const navigate = useNavigate();

  const handlers = {
    onNewPasswordFormSubmit: async (data: TUserMainLogin) => {
      await sessionStore.resetPassword(data);

      if (!sessionStore.error) {
        snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Пароль успешно обновлён!',
        });
        return navigate('/');
      }

      snackbarsStore.setErrorSnack({
        buttonText: 'Понятно',
        bodyText: sessionStore.error,
      });
    },
  };

  const options = {
    isFormDisabled: sessionStore.isWaitingRestore,
  };

  return (
    <>
      <Title sx={{ textAlign: 'center', mb: 1.5 }}>Ввод нового пароля</Title>

      <Box sx={{ display: 'flex', placeContent: 'center' }}>
        <EmailPasswordFormNew
          defaultEmail={sessionStore.profile?.login}
          disabled={options.isFormDisabled}
          onSubmit={handlers.onNewPasswordFormSubmit}
        />
      </Box>
    </>
  );
}

export default observer(EmailPasswordFormRestoreNew);
