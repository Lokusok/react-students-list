import { memo } from 'react';
import { Helmet } from 'react-helmet';

import EmailPasswordFormRestoreNew from '@src/containers/email-password-form-restore-new';

function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Задать новый пароль</title>
      </Helmet>
      <EmailPasswordFormRestoreNew />;
    </>
  );
}

export default memo(NewPasswordPage);
