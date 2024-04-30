import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, FormControl, FormHelperText, Input } from '@mui/joy';
import { Paper } from '@mui/material';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TProps = {
  helperText?: string;
  disabled?: boolean;
  onSubmit: (data: TInputs) => void;
  defaultEmail?: string;
};

const schema = z.object({
  email: z.string().email({ message: 'Введите Email!' }),
});

type TInputs = {
  email: string;
};

function EmailForm(props: TProps) {
  const { helperText, onSubmit, defaultEmail, disabled = false } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TInputs>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: defaultEmail,
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
        <FormControl
          disabled={disabled}
          sx={{ mb: 2 }}
          error={Boolean(errors.email)}
        >
          {helperText && (
            <FormHelperText sx={{ mb: 0.5 }}>{helperText}</FormHelperText>
          )}
          <Input {...register('email')} placeholder="Введите email" />

          {Boolean(errors.email) && (
            <FormHelperText>{errors.email?.message}</FormHelperText>
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

export default memo(EmailForm);
