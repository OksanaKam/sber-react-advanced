import { z } from 'zod';

export const socialLinkSchema = z.object({
  platform: z.string().trim().min(1, 'Введите название платформы'),
  profile: z
    .string()
    .trim()
    .min(1, 'Введите ссылку на профиль')
    .url('Некорректный URL'),
});

export const formRegistrationSchema = z
  .object({
    username: z.string().trim().min(1, 'Введите имя пользователя'),
    email: z.email({ message: 'Некорректный email' }),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    socialLinks: z.array(socialLinkSchema).optional(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type FormRegistrationValues = z.infer<typeof formRegistrationSchema>;

export const defaultValues: FormRegistrationValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  socialLinks: [{ platform: '', profile: '' }],
};
