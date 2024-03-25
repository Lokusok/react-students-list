import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

type TProps = {
  title?: string | React.ReactNode;
  descr?: string | React.ReactNode;
  onReject?: () => void;
  onAgree?: () => void;
};

function AlertDialogModal(props: TProps) {
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => props.onReject?.()}
      >
        Discard
      </Button>
      <Modal open={true} onClose={() => props.onReject?.()}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {props.title}
          </DialogTitle>
          <Divider />
          <DialogContent>{props.descr}</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => props.onAgree?.()}
            >
              Подтвердить удаление
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => props.onReject?.()}
            >
              Отменить
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default React.memo(AlertDialogModal);
