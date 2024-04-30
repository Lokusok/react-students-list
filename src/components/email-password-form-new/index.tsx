import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, FormControl, FormHelperText, Input } from '@mui/joy';
import { Paper } from '@mui/material';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { dataForm } from '@src/shared/schemas';

type TProps = {
  disabled?: boolean;
  onSubmit: (data: TInputs) => void;
  defaultEmail?: string;
};

type TInputs = {
  login: string;
  password: string;
};

const dataFormExtended = dataForm.extend({
  login: z.string().email().optional(),
});

function EmailPasswordFormNew(props: TProps) {
  const { onSubmit, disabled = false } = props;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm<TInputs>({
    resolver: zodResolver(dataFormExtended),
    mode: 'onTouched',
    values: {
      login: 'test@gmail.com', // Запросить с сервера по id
      password: '',
    },
  });

  const handlers = {
    onSubmit: (data: TInputs) => {
      onSubmit(data);
    },
  };

  const options = {
    isSubmitBtnDisabled: !isValid,
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 340, width: '100%', p: 4 }}>
      <form onSubmit={handleSubmit(handlers.onSubmit)}>
        <FormControl disabled={disabled} sx={{ mb: 2 }}>
          <FormHelperText sx={{ mb: 0.5 }}>
            На эту почту пришло письмо
          </FormHelperText>
          <Input
            sx={{ pointerEvents: 'none', color: 'gray' }}
            {...register('login', {
              onChange: () => resetField('login'),
            })}
            placeholder="Введите email"
          />
        </FormControl>

        <FormControl error={Boolean(errors.password)} sx={{ mb: 2 }}>
          <FormHelperText sx={{ mb: 0.5 }}>
            Это будет новый пароль
          </FormHelperText>

          <Input {...register('password')} placeholder="Введите новый пароль" />

          {Boolean(errors.password) && (
            <FormHelperText>{errors.password?.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <Button disabled={options.isSubmitBtnDisabled} type="submit">
            Отправить
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}

export default memo(EmailPasswordFormNew);
