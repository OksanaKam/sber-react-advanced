import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetTasksQuery, type Task } from 'entities/task';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(): {
  tasks: Task[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  removeTask: (id: number) => void;
} {
  const { data } = useGetTasksQuery();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (data !== undefined && !initialized.current) {
      initialized.current = true;
      setAllTasks(data);
    }
  }, [data]);

  const [filter, setFilter] = useState<Filter>('all');

  const tasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    });
  }, [allTasks, filter]);

  const removeTask = useCallback((id: number) => {
    setAllTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }, []);

  return { tasks, filter, setFilter, removeTask };
}
