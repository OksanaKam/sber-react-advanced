import { useActionState } from 'react';
import { initialState, subscribeAction } from '../model/subscriptionAction';
import styles from './SubscriptionForm.module.css';

export function SubscriptionForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    initialState,
  );

  return (
    <section className={styles.section}>
      <h2>Подписка на новости</h2>
      {state.success ? (
        <p className={styles.success} role="status">
          Подписка для {state.email} подтверждена.
        </p>
      ) : (
        <form action={formAction} noValidate className={styles.form}>
          <p className={styles.step}>
            Шаг {state.step} из 2 ·{' '}
            {state.step === 1 ? 'Ваш email' : 'Подтверждение'}
          </p>
          {state.step === 1 ? (
            <div className={styles.field}>
              <label htmlFor="subscription-email">Email</label>
              <input
                id="subscription-email"
                name="email"
                type="email"
                defaultValue={state.email}
                className={state.error ? styles.inputError : undefined}
                placeholder="example@example.com"
                disabled={isPending}
              />
              {state.error && (
                <p className={styles.error} role="alert">
                  {state.error}
                </p>
              )}
            </div>
          ) : (
            <p className={styles.confirmation}>
              Подтвердите подписку на новости для <strong>{state.email}</strong>
              .
            </p>
          )}
          <div className={styles.actions}>
            {state.step === 2 && (
              <button
                type="submit"
                name="intent"
                value="back"
                disabled={isPending}
                className={styles.secondary}
              >
                Изменить email
              </button>
            )}
            <button
              type="submit"
              name="intent"
              value="continue"
              disabled={isPending}
              className={styles.primary}
            >
              {isPending
                ? 'Отправляем…'
                : state.step === 1
                  ? 'Продолжить'
                  : 'Подтвердить подписку'}
            </button>
          </div>
          {isPending && (
            <p className={styles.description} role="status">
              Обрабатываем запрос…
            </p>
          )}
        </form>
      )}
    </section>
  );
}
