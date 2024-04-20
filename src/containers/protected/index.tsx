import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { useStores } from '@src/hooks/use-stores';

type TProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

function Protected(props: TProps) {
  const { sessionStore } = useStores();

  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!sessionStore.profile && !sessionStore.waiting) {
      navigate(location.state?.from || props.redirectTo || '/', {
        state: { from: location.pathname },
      });
    }
  }, [
    props.redirectTo,
    navigate,
    sessionStore.profile,
    sessionStore.waiting,
    location,
  ]);

  return <>{props.children}</>;
}

export default observer(Protected);
