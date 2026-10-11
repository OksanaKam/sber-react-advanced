import { TaskCard } from 'entities/task';
import type { Task } from 'entities/task';
import { FilterButton } from 'shared/ui/FilterButton';
import type { Filter } from '../model/useTasks';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  removeTask: (id: number) => void;
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Выполненные' },
  { value: 'incomplete', label: 'Невыполненные' },
];

export function TaskList({
  tasks,
  filter,
  setFilter,
  removeTask,
}: TaskListProps) {
  return (
    <section aria-label="Список задач">
      <div
        className={styles.filters}
        role="group"
        aria-label="Фильтр по статусу"
      >
        {filters.map(({ value, label }) => (
          <FilterButton
            key={value}
            active={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </FilterButton>
        ))}
      </div>
      {tasks.length === 0 ? (
        <p>
          {filter === 'all'
            ? 'Задач пока нет.'
            : 'Нет задач с выбранным статусом.'}
        </p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <div className={styles.card}>
                <TaskCard task={task} />
              </div>
              <button
                type="button"
                className={styles.deleteButton}
                aria-label={`Удалить задачу «${task.title}»`}
                onClick={() => removeTask(task.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
