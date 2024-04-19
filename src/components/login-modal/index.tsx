import * as React from 'react';
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
import { useForm } from 'react-hook-form';

type TProps = {
  onClose: () => void;
};

type TInputs = {
  login: string;
  password: string;
};

function LoginModal(props: TProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<TInputs>();

  const handlers = {
    onSubmit: (data: TInputs) => {
      props.onClose?.();
    },
  };

  const options = {
    isSubmitDisabled: !isDirty || !isValid,
  };

  return (
    <>
      <Modal
        data-testid="login-modal"
        open={true}
        onClose={() => props.onClose?.()}
      >
        <ModalDialog sx={{ maxWidth: 320 }}>
          <ModalClose
            data-testid="close-modal"
            onClick={() => props.onClose?.()}
          />
          <DialogTitle>Вход в аккаунт</DialogTitle>
          <DialogContent>
            Войдите в аккаунт, чтобы пользоваться приложением
          </DialogContent>
          <form onSubmit={handleSubmit(handlers.onSubmit)}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Логин:</FormLabel>
                <Input
                  {...register('login', { required: true })}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль:</FormLabel>
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  required
                />
              </FormControl>
              <Button disabled={options.isSubmitDisabled} type="submit">
                Войти
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default React.memo(LoginModal);
