import React from 'react';

import { observer } from 'mobx-react-lite';

import LoginModalWrapper from '../login-modal-wrapper';
import RegisterModalWrapper from '../register-modal-wrapper';

import { useStores } from '@src/hooks/use-stores';

type TModalsProps = { onClose: () => void };

function AllModals() {
  const { modalsStore, sessionStore } = useStores();

  const modalsReducer = (
    modalId: string,
    { props }: { props: TModalsProps }
  ) => {
    switch (modalId) {
      case 'login': {
        sessionStore.resetErrors();
        return <LoginModalWrapper {...props} />;
      }
      case 'register': {
        sessionStore.resetErrors();
        return <RegisterModalWrapper {...props} />;
      }
    }
  };

  return (
    <>
      {modalsStore.activeModals.map((modalId) => (
        <React.Fragment key={modalId}>
          {modalsReducer(modalId, {
            props: {
              onClose: () => modalsStore.removeActiveModal(modalId),
            },
          })}
        </React.Fragment>
      ))}
    </>
  );
}

export default observer(AllModals);
