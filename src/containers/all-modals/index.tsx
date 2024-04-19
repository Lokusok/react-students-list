import React from 'react';

import { observer } from 'mobx-react-lite';

import LoginModal from '@src/components/login-modal';
import RegisterModalWrapper from '../register-modal-wrapper';

import { useStores } from '@src/store';

type TModalsProps = { onClose: () => void };

function AllModals() {
  const { modalsStore } = useStores();

  const modalsReducer = (
    modalId: string,
    { props }: { props: TModalsProps }
  ) => {
    switch (modalId) {
      case 'login':
        return <LoginModal {...props} />;
      case 'register':
        return <RegisterModalWrapper {...props} />;
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
