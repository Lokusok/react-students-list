import React from 'react';

import { observer } from 'mobx-react-lite';

import LoginModalWrapper from '../login-modal-wrapper';
import RegisterModalWrapper from '../register-modal-wrapper';
import DeleteAgreeModal from '../delete-agree-modal';
import ChangeAgreeModal from '../change-agree-modal';
import ConfirmPasswordUserDeleteModalWrapper from '../confirm-password-user-delete-modal-wrapper';

import useStores from '@src/hooks/use-stores';
import RolesChartModalWrapper from '../roles-chart-modal-wrapper';

type TModalsProps = {
  onClose: () => void;
};

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
      case 'deleteAgree': {
        sessionStore.resetErrors();
        return <DeleteAgreeModal {...props} />;
      }
      case 'changeAgree': {
        sessionStore.resetErrors();
        return <ChangeAgreeModal {...props} />;
      }
      case 'confirmPasswordUserDelete': {
        sessionStore.resetErrors();
        return <ConfirmPasswordUserDeleteModalWrapper {...props} />;
      }
      case 'rolesCountChart': {
        sessionStore.resetErrors();
        return <RolesChartModalWrapper {...props} />;
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
