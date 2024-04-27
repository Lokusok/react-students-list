import { memo } from 'react';

import { useForm } from 'react-hook-form';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { ModalClose } from '@mui/joy';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TProps = {
  onClose?: () => void;
};

const schema = z.object({
  password: z.string(),
});

function ConfirmPasswordModal(props: TProps) {
  const { ...register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Modal open={true} onClose={() => props.onClose?.()}>
      <ModalDialog sx={{ maxWidth: 320 }}>
        <ModalClose onClick={() => props.onClose?.()} />
        <DialogTitle>Введите пароль</DialogTitle>
        <DialogContent>
          Для совершения действия, введите пароль от аккаунта
        </DialogContent>
        <form onSubmit={() => console.log('hello world')}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Пароль:</FormLabel>
              <Input type="password" required />
            </FormControl>

            <Button type="submit">Подтвердить</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default memo(ConfirmPasswordModal);
