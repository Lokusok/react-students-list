import React from 'react';

import { observer } from 'mobx-react-lite';
import modalsStore from '@src/store/modals';
import LoginModal from '@src/components/login-modal';

type TModalsProps = { onClose: () => void };

function AllModals() {
  const modalsReducer = (
    modalId: string,
    { props }: { props: TModalsProps }
  ) => {
    switch (modalId) {
      case 'login':
        return <LoginModal {...props} />;
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
