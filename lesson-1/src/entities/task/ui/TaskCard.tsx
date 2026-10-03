import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{task.title}</h2>
      <span
        className={`${styles.status} ${task.completed ? styles.completed : styles.incomplete}`}
      >
        <span aria-hidden="true">{task.completed ? '✓' : '○'}</span>
        {task.completed ? 'Выполнена' : 'Не выполнена'}
      </span>
    </article>
  );
}
