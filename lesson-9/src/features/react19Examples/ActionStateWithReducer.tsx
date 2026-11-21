import { startTransition, useActionState } from 'react';
import styles from './React19Examples.module.css';

interface FormValues {
  username: string;
  email: string;
}

interface FormState {
  status: 'idle' | 'dirty' | 'success';
  savedValues: FormValues | null;
}

type FormAction =
  | { type: 'change' }
  | { type: 'save'; formData: FormData };

const initialState: FormState = { status: 'idle', savedValues: null };

async function formReducer(
  previousState: FormState,
  action: FormAction,
): Promise<FormState> {
  switch (action.type) {
    case 'change':
      return { ...previousState, status: 'dirty' };
    case 'save': {
      const values: FormValues = {
        username: String(action.formData.get('username') ?? ''),
        email: String(action.formData.get('email') ?? ''),
      };

      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      return { status: 'success', savedValues: values };
    }
  }
}

export function ActionStateWithReducer() {
  const [state, dispatch, isPending] = useActionState(formReducer, initialState);
  const status = isPending ? 'submitting' : state.status;

  function handleChange() {
    if (state.status !== 'dirty') {
      startTransition(() => dispatch({ type: 'change' }));
    }
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Форма с редюсером</h2>
      <form
        action={(formData) => dispatch({ type: 'save', formData })}
        onChange={handleChange}
        className={styles.form}
      >
        <input
          name="username"
          type="text"
          className={styles.input}
          placeholder="Введите имя"
          readOnly={isPending}
        />
        <input
          name="email"
          type="email"
          className={styles.input}
          placeholder="Введите email"
          readOnly={isPending}
        />
        <button type="submit" className={styles.button} disabled={isPending}>
          {isPending ? 'Сохраняем…' : 'Сохранить'}
        </button>
      </form>
      <p className={styles.result} role="status">{status}</p>
    </section>
  );
}
