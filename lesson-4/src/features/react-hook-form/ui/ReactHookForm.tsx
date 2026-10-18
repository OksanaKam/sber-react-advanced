import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ReactHookForm.module.css';
import {
  formRegistrationSchema,
  defaultValues,
  type FormRegistrationValues,
} from '../model/formSchema';

export const ReactHookForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegistrationValues>({
    resolver: zodResolver(formRegistrationSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const onSubmit = (values: FormRegistrationValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            className={errors.username ? styles.inputError : undefined}
            {...register('username')}
            placeholder="Введите имя пользователя"
          />
          {errors.username && (
            <div className={styles.error} id="username-error" role="alert">
              {errors.username.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={errors.email ? styles.inputError : undefined}
            {...register('email')}
            placeholder="example@example.com"
          />
          {errors.email && (
            <div className={styles.error} id="email-error" role="alert">
              {errors.email.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            className={errors.password ? styles.inputError : undefined}
            {...register('password')}
            placeholder="Введите пароль"
          />
          {errors.password && (
            <div className={styles.error} id="password-error" role="alert">
              {errors.password.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Подтвердить пароль</label>
          <input
            type="password"
            id="confirmPassword"
            className={errors.confirmPassword ? styles.inputError : undefined}
            {...register('confirmPassword')}
            placeholder="Подтвердите пароль"
          />
          {errors.confirmPassword && (
            <div
              className={styles.error}
              id="confirmPassword-error"
              role="alert"
            >
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <fieldset className={styles.socialLinks}>
          <h3>Социальные ссылки</h3>
          <p className={styles.hint}>Добавьте ссылки на свои профили</p>
          <div className={styles.linksList}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.linkCard}>
                <div className={styles.linkField}>
                  <label htmlFor={`platform-${field.id}`}>Платформа</label>
                  <input
                    id={`platform-${field.id}`}
                    className={
                      errors.socialLinks?.[index]?.platform
                        ? styles.inputError
                        : undefined
                    }
                    {...register(`socialLinks.${index}.platform` as const)}
                    placeholder="Например, GitHub"
                  />
                  {errors.socialLinks?.[index]?.platform && (
                    <div className={styles.error}>
                      {errors.socialLinks[index]?.platform?.message}
                    </div>
                  )}
                </div>
                <div className={styles.linkField}>
                  <label htmlFor={`profile-${field.id}`}>
                    Ссылка на профиль
                  </label>
                  <input
                    id={`profile-${field.id}`}
                    type="url"
                    className={
                      errors.socialLinks?.[index]?.profile
                        ? styles.inputError
                        : undefined
                    }
                    {...register(`socialLinks.${index}.profile` as const)}
                    placeholder="https://github.com/username"
                  />
                  {errors.socialLinks?.[index]?.profile && (
                    <div className={styles.error}>
                      {errors.socialLinks[index]?.profile?.message}
                    </div>
                  )}
                </div>
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => remove(index)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <button
            className={styles.addButton}
            type="button"
            onClick={() => append({ platform: '', profile: '' })}
          >
            + Добавить ссылку
          </button>
        </fieldset>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
