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

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TProps = {
  onClose: () => void;
  onSubmit: (data: TInputs) => void;
  isSubmitBtnDisabled?: boolean;
  errorPasswordField?: string;
};

const schema = z.object({
  password: z.string().min(1, { message: 'Введите пароль!' }),
});

type TInputs = {
  password: string;
};

function ConfirmPasswordModal(props: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TInputs>({
    resolver: zodResolver(schema),
  });

  const handlers = {
    onSubmit: (data: TInputs) => {
      props.onSubmit(data);
    },
  };

  const options = {
    isSubmitBtnDisabled: !isValid || props.isSubmitBtnDisabled,
  };

  return (
    <Modal open={true} onClose={() => props.onClose?.()}>
      <ModalDialog sx={{ maxWidth: 320 }}>
        <ModalClose onClick={() => props.onClose?.()} />
        <DialogTitle>Введите пароль</DialogTitle>
        <DialogContent>
          Для совершения действия, введите пароль от аккаунта
        </DialogContent>
        <form onSubmit={handleSubmit(handlers.onSubmit)}>
          <Stack spacing={2}>
            <FormControl
              error={
                Boolean(errors.password) || Boolean(props.errorPasswordField)
              }
            >
              <FormLabel>Пароль:</FormLabel>
              <Input {...register('password')} type="password" required />

              {errors.password && (
                <FormHelperText>{errors.password?.message}</FormHelperText>
              )}

              {props.errorPasswordField && (
                <FormHelperText>{props.errorPasswordField}</FormHelperText>
              )}
            </FormControl>

            <Button disabled={options.isSubmitBtnDisabled} type="submit">
              Подтвердить
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default memo(ConfirmPasswordModal);
