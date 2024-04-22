import { memo } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Checkbox from '@mui/joy/Checkbox';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { FormHelperText, ModalClose } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';

import { TUserLogin } from '@src/shared/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { dataForm } from '@src/shared/schemas';
import z from 'zod';

type TProps = {
  isSubmitDisabled?: boolean;
  onFormSubmit: (data: TUserLogin) => void;
  onClose: () => void;
  errorMessage: string;
};

const loginDataForm = dataForm.extend({
  remember: z.boolean(),
});

function LoginModal(props: TProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<TUserLogin>({
    mode: 'onTouched',
    resolver: zodResolver(loginDataForm),
  });

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
              <FormControl
                error={options.isShowedFormError || Boolean(errors.login)}
              >
                <FormLabel>Логин:</FormLabel>
                <Input
                  {...register('login', { required: true })}
                  data-testid="auth-input-login"
                  required
                />
                {errors.login && (
                  <FormHelperText>{errors.login?.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                error={options.isShowedFormError || Boolean(errors.password)}
              >
                <FormLabel>Пароль:</FormLabel>
                <Input
                  {...register('password', { required: true })}
                  data-testid="auth-input-password"
                  type="password"
                  required
                />
                {errors.password && (
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <Checkbox {...register('remember')} label="Запомнить" />
              </FormControl>

              {options.isShowedFormError && (
                <FormControl error>
                  <FormHelperText>
                    <InfoOutlined />
                    {props.errorMessage}
                  </FormHelperText>
                </FormControl>
              )}

              <Button
                data-testid="auth-btn-submit"
                disabled={options.isSubmitDisabled}
                type="submit"
              >
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
