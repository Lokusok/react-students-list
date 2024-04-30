import { observer } from 'mobx-react-lite';

import { Alert, Box, Typography } from '@mui/joy';

import Title from '@src/components/title';
import EmailForm from '@src/components/email-form';
import DangerousIcon from '@mui/icons-material/Dangerous';

import { useStores } from '@src/hooks/use-stores';

function EmailFormRestorePassword() {
  const { sessionStore, snackbarsStore } = useStores();

  const handlers = {
    onEmailFormSubmit: async (data: { email: string }) => {
      await sessionStore.startRestorePassword(data.email);

      if (!sessionStore.error) {
        snackbarsStore.setInfoSnack({
          buttonText: 'Понятно',
          bodyText: 'Проверьте свою почту на наличие письма',
        });
      }
    },
  };

  const options = {
    isFormDisabled:
      sessionStore.isRestoringPasswordInProcess ||
      sessionStore.isWaitingRestore,
  };

  const values = {
    helperText: options.isFormDisabled
      ? 'Проверьте почту на наличие письма'
      : 'На неё придёт письмо',
  };

  return (
    <>
      <Title sx={{ textAlign: 'center', mb: 1.5 }}>Восстановление пароля</Title>

      {sessionStore.error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
          <Alert
            startDecorator={<DangerousIcon />}
            color="danger"
            variant="soft"
            sx={{ maxWidth: 420 }}
          >
            <Typography>{sessionStore.error}</Typography>
          </Alert>
        </Box>
      )}

      <Box sx={{ display: 'flex', placeContent: 'center' }}>
        <EmailForm
          defaultEmail={sessionStore.profile?.login}
          disabled={options.isFormDisabled}
          onSubmit={handlers.onEmailFormSubmit}
          helperText={values.helperText}
        />
      </Box>
    </>
  );
}

export default observer(EmailFormRestorePassword);
