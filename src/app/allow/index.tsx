import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import useStores from '@src/hooks/use-stores';
import Allow from '@src/components/allow';

function AllowPage() {
  const { sessionStore, snackbarsStore } = useStores();
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'rejected'>(
    'pending'
  );

  const { id } = useParams();

  useEffect(() => {
    const asyncEffect = async () => {
      setStatus('pending');

      await sessionStore.makeAllowedUser(id!);

      if (!sessionStore.error) {
        snackbarsStore.setSuccessSnack({
          buttonText: 'Понятно',
          bodyText: 'Аккаунт успешно подтверждён. Можно войти',
        });
        return setStatus('fulfilled');
      }

      setStatus('rejected');
      snackbarsStore.setErrorSnack({
        buttonText: 'Понятно',
        bodyText: 'Произошла ошибка при подтверждении аккаунта',
      });
    };

    asyncEffect();
  }, [id, sessionStore, snackbarsStore]);

  return (
    <>
      <Helmet>
        <title>Подтверждение аккаунта</title>
      </Helmet>

      <Allow status={status} error={sessionStore.error} />
    </>
  );
}

export default observer(AllowPage);
