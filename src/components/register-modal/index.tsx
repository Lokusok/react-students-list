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
import { FormHelperText, ModalClose } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import { TUserRegister } from '@src/shared/types';

import { dataForm } from '@src/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

type TProps = {
  isSubmitDisabled?: boolean;
  onFormSubmit: (data: TUserRegister) => void;
  onClose: () => void;
  errorMessage: string;
};

const registerDataForm = dataForm
  .extend({
    passwordAgain: z.string(),
  })
  .refine(
    (schema) => {
      console.log({ schema });
      return schema.password === schema.passwordAgain;
    },
    {
      message: 'Пароли не совпадают',
      path: ['passwordAgain'],
    }
  );

function RegisterModal(props: TProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<TUserRegister>({
    mode: 'onTouched',
    resolver: zodResolver(registerDataForm),
  });

  console.log({ errorMessageCmp: props.errorMessage });

  const handlers = {
    onSubmit: (data: TUserRegister) => {
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
              <FormControl
                error={options.isShowedFormError || Boolean(errors.login)}
              >
                <FormLabel>Логин:</FormLabel>
                <Input
                  {...register('login', { required: true })}
                  autoFocus
                  required
                />
                {Boolean(errors.login) && (
                  <FormHelperText>{errors.login?.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                error={options.isShowedFormError || Boolean(errors.password)}
              >
                <FormLabel>Пароль:</FormLabel>
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  required
                />
                {Boolean(errors.password) && (
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                error={
                  options.isShowedFormError || Boolean(errors.passwordAgain)
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
                    {errors.passwordAgain?.message}
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
