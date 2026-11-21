import { startTransition, useActionState } from 'react';
import styles from './React19Examples.module.css';

interface SaveState {
  status: 'idle' | 'success';
  savedText: string;
}

const initialState: SaveState = { status: 'idle', savedText: '' };

async function saveText(
  _previousState: SaveState,
  formData: FormData | null,
): Promise<SaveState> {
  if (formData === null) return initialState;

  const text = String(formData.get('text') ?? '');
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));

  return { status: 'success', savedText: text };
}

export function FormWithAsyncSave() {
  const [state, submit, isPending] = useActionState(saveText, initialState);
  const status = isPending ? 'saving' : state.status;

  function handleChange() {
    if (state.status === 'success') {
      startTransition(() => submit(null));
    }
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Асинхронное сохранение</h2>
      <form action={submit} className={styles.form}>
        <div>
          <input
            name="text"
            type="text"
            className={styles.input}
            placeholder="Введите текст"
            readOnly={isPending}
            onChange={handleChange}
          />
        </div>
        <button className={styles.button} type="submit" disabled={isPending}>
          {status === 'saving' ? 'Сохраняем…' : status === 'success' ? 'Сохранено!' : 'Сохранить'}
        </button>
      </form>
      <p className={styles.result} role="status">
        {status}
      </p>
    </section>
  );
}
