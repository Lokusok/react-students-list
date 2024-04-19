import { memo, useEffect } from 'react';
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
import { TUserRegister } from '@src/shared/types';

type TProps = {
  isSubmitDisabled?: boolean;
  onFormSubmit: (data: TUserRegister) => void;
  onClose: () => void;
  errorMessage: string;
};

function RegisterModal(props: TProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    watch,
    setError,
    clearErrors,
  } = useForm<TUserRegister>();

  console.log({ errorMessageCmp: props.errorMessage });

  const handlers = {
    onSubmit: (data: TUserRegister) => {
      props.onFormSubmit(data);
    },
  };

  const system = {
    isPasswordsEquals: watch('password') === watch('passwordAgain'),
  };

  const options = {
    isSubmitDisabled:
      !isDirty ||
      !isValid ||
      !system.isPasswordsEquals ||
      props.isSubmitDisabled,
    isShowedFormError: Boolean(props.errorMessage),
  };

  useEffect(() => {
    if (!system.isPasswordsEquals) {
      setError('passwordAgain', { message: 'Пароли не совпадают' });
    } else {
      clearErrors('passwordAgain');
    }
  }, [system.isPasswordsEquals, setError, clearErrors]);

  return (
    <>
      <Modal
        data-testid="register-modal"
        open={true}
        onClose={() => props.onClose?.()}
      >
        <ModalDialog sx={{ maxWidth: 320 }}>
          <ModalClose
            data-testid="close-modal"
            onClick={() => props.onClose?.()}
          />
          <DialogTitle>Регистрация на платформе</DialogTitle>
          <DialogContent>
            Чтобы пользоваться приложением необходима регистрация
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
              <FormControl
                error={
                  Boolean(errors.passwordAgain) || options.isShowedFormError
                }
              >
                <FormLabel>Подтвердите пароль:</FormLabel>
                <Input
                  {...register('passwordAgain', { required: true })}
                  type="password"
                  required
                />
                {errors.passwordAgain && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.passwordAgain.message}
                  </FormHelperText>
                )}
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
                Зарегистрироваться
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default memo(RegisterModal);
