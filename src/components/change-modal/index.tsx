import * as React from 'react';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';

import StudentForm from '../student-form';
import { TInputs, TStudentData } from '@src/shared/types';
import { Box } from '@mui/material';

type TProps = {
  onReject?: () => void;
  studentData: TStudentData;
  onChange: (e: React.ChangeEvent<TInputs>) => void;
  onExtraChange: (id: string, value: string) => void;
  onAvatarChange: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function ChangeModal(props: TProps) {
  const handlers = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      props.onSubmit(e);
    },
  };

  return (
    <Modal open={true} onClose={() => props.onReject?.()}>
      <ModalOverflow>
        <ModalDialog layout={'center'}>
          <ModalClose onClick={() => props.onReject?.()} />
          <Box sx={{ mt: '30px' }}>
            <StudentForm
              title={'Изменить студента'}
              studentData={props.studentData}
              submitText={'Изменить'}
              onChange={props.onChange}
              onSubmit={handlers.onSubmit}
              onExtraChange={props.onExtraChange}
              onAvatarChange={props.onAvatarChange}
            />
          </Box>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

export default React.memo(ChangeModal);
