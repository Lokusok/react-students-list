import { observer } from 'mobx-react-lite';

import { useStores } from '@src/hooks/use-stores';
import useInit from '@src/hooks/use-init';

import EmailFormRestorePassword from '@src/containers/email-form-restore-password';

function PasswordRestorePage() {
  const { sessionStore } = useStores();

  useInit(() => {
    sessionStore.resetErrors();
  });

  return <EmailFormRestorePassword />;
}

export default observer(PasswordRestorePage);
