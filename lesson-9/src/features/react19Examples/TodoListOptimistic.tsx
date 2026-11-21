import { useActionState, useOptimistic } from 'react';
import styles from './React19Examples.module.css';

interface Todo {
  id: string;
  title: string;
  pending?: boolean;
}

const initialTodos: Todo[] = [];

export function TodoListOptimistic() {
  const [todos, submit, isPending] = useActionState(saveTodo, initialTodos);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo: Todo) => [...currentTodos, newTodo],
  );

  async function saveTodo(previousTodos: Todo[], formData: FormData): Promise<Todo[]> {
    const title = String(formData.get('title') ?? '').trim();
    if (!title) return previousTodos;

    const todo: Todo = { id: crypto.randomUUID(), title };
    addOptimisticTodo({ ...todo, pending: true });

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    return [...previousTodos, todo];
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Оптимистичный список задач</h2>
      <form action={submit} className={styles.form}>
        <div>
          <input
            name="title"
            className={styles.input}
            placeholder="Введите задачу"
            readOnly={isPending}
          />
        </div>
        <button type="submit" className={styles.button} disabled={isPending}>
          {isPending ? 'Сохраняем…' : 'Добавить'}
        </button>
      </form>
      {optimisticTodos.length !== 0 && (
        <ul className={styles.todoList}>
          {optimisticTodos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
