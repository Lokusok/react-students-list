import z from 'zod';

export const dataForm = z.object({
  login: z.string().email({ message: 'В качестве логина используйте почту!' }),
  password: z
    .string()
    .min(5, { message: 'Минимальная длина пароля - 5 символов!' }),
});
