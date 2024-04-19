import { useEffect, memo } from 'react';
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
import { FormHelperText, ModalClose } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';

import { TUserLogin } from '@src/shared/types';

type TProps = {
  isSubmitDisabled?: boolean;
  onFormSubmit: (data: TUserLogin) => void;
  onClose: () => void;
  errorMessage: string;
};

function LoginModal(props: TProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<TUserLogin>();

  const handlers = {
    onSubmit: (data: TUserLogin) => {
      props.onFormSubmit(data);
    },
  };

  const options = {
    isSubmitDisabled: !isDirty || !isValid || props.isSubmitDisabled,
    isShowedFormError: Boolean(props.errorMessage),
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
              <FormControl error={options.isShowedFormError}>
                <FormLabel>Логин:</FormLabel>
                <Input
                  {...register('login', { required: true })}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl error={options.isShowedFormError}>
                <FormLabel>Пароль:</FormLabel>
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  required
                />
              </FormControl>

              {options.isShowedFormError && (
                <FormControl error>
                  <FormHelperText>
                    <InfoOutlined />
                    {props.errorMessage}
                  </FormHelperText>
                </FormControl>
              )}

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

export default memo(LoginModal);
