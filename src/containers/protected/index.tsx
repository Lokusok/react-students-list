import { useLocation, useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import sessionStore from '@src/store/session';
import { useLayoutEffect } from 'react';

type TProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

function Protected(props: TProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!sessionStore.profile && !sessionStore.loading) {
      navigate(location.state?.from || props.redirectTo || '/', {
        state: { from: location.pathname },
      });
    }
  }, [sessionStore.profile, sessionStore.loading, location]);

  return <>{props.children}</>;
}

export default observer(Protected);
