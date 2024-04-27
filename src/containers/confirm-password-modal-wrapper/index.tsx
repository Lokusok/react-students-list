import { memo } from 'react';

import ConfirmPasswordModal from '@src/components/confirm-password-modal';

type TProps = {
  onClose: () => void;
};

function ConfirmPasswordModalWrapper(props: TProps) {
  return (
    <>
      <ConfirmPasswordModal {...props} />
    </>
  );
}

export default memo(ConfirmPasswordModalWrapper);
