import { observer } from 'mobx-react-lite';

import { Box } from '@mui/joy';

import Title from '@src/components/title';
import EmailPasswordFormNew from '@src/components/email-password-form-new';

import { useStores } from '@src/hooks/use-stores';

import { TUserMainLogin } from '@src/shared/types';

function EmailPasswordFormRestoreNew() {
  const { sessionStore, snackbarsStore } = useStores();

  const handlers = {
    onNewPasswordFormSubmit: async (data: TUserMainLogin) => {
      await sessionStore.resetPassword();
      console.log(data);

      if (!sessionStore.error) {
        return snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Пароль успешно обновлён!',
        });
      }

      snackbarsStore.setErrorSnack({
        buttonText: 'Понятно',
        bodyText: 'Произошла ошибка при обновлении пароля',
      });
    },
  };

  return (
    <>
      <Title sx={{ textAlign: 'center', mb: 1.5 }}>Ввод нового пароля</Title>

      <Box sx={{ display: 'flex', placeContent: 'center' }}>
        <EmailPasswordFormNew onSubmit={handlers.onNewPasswordFormSubmit} />
      </Box>
    </>
  );
}

export default observer(EmailPasswordFormRestoreNew);
