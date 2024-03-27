import React, { memo } from 'react';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

type TProps = {
  title: string;
  descr?: string;
  onReject?: () => void;
  onAgree?: () => void;
};

function ChangeModal(props: TProps) {
  return (
    <React.Fragment>
      <Modal open={true} onClose={() => props.onReject?.()}>
        <ModalDialog>
          <DialogTitle>{props.title}</DialogTitle>
          {props.descr && <DialogContent>{props.descr}</DialogContent>}
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              props.onReject?.();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Примечания</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Изменить</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default memo(ChangeModal);
