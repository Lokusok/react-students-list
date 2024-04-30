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
  const { onSubmit, defaultEmail = '', disabled = false } = props;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm<TInputs>({
    resolver: zodResolver(dataFormExtended),
    mode: 'onTouched',
    values: {
      login: defaultEmail,
      password: '',
    },
  });

  const handlers = {
    onSubmit: (data: TInputs) => {
      onSubmit(data);
    },
  };

  const options = {
    isSubmitBtnDisabled: !isValid || disabled,
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 340, width: '100%', p: 4 }}>
      <form onSubmit={handleSubmit(handlers.onSubmit)}>
        <FormControl sx={{ mb: 2 }}>
          <FormHelperText sx={{ mb: 0.5 }}>
            На эту почту пришло письмо
          </FormHelperText>
          <Input
            sx={{ pointerEvents: 'none', color: 'gray' }}
            {...register('login', {
              onChange: () => resetField('login'),
            })}
            disabled={disabled}
            placeholder="Введите email"
          />
        </FormControl>

        <FormControl error={Boolean(errors.password)} sx={{ mb: 2 }}>
          <FormHelperText sx={{ mb: 0.5 }}>
            Это будет новый пароль
          </FormHelperText>

          <Input
            {...register('password')}
            disabled={disabled}
            placeholder="Введите новый пароль"
          />

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
