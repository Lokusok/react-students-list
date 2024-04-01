import React from 'react';
import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react-lite';
import LoginModal from '@src/components/login-modal';

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Вход в аккаунт</title>
      </Helmet>

      <h1>Вход в аккаунт</h1>

      <LoginModal />
    </>
  );
}

export default observer(LoginPage);
