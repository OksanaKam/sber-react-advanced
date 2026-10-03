import { useCallback, useMemo, useState } from 'react';
import type { Task } from 'entities/task';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(): {
  tasks: Task[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  removeTask: (id: string) => void;
} {
  const initialTasks: Task[] = [
    { id: '1', title: 'Реализовать сущность Task', completed: true },
    { id: '2', title: 'Создать компонент Список задач', completed: true },
    { id: '3', title: 'Проверить домашнее задание', completed: false },
  ];

  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>('all');

  const tasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    });
  }, [allTasks, filter]);

  const removeTask = useCallback((id: string) => {
    setAllTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }, []);

  return { tasks, filter, setFilter, removeTask };
}
