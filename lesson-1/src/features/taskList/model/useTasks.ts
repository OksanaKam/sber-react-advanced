import { useState } from 'react';
import type { Task } from 'entities/task';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(initial: Task[]): {
  tasks: Task[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  removeTask: (id: string) => void;
} {
  const [allTasks, setAllTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Filter>('all');

  const tasks = allTasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  function removeTask(id: string) {
    setAllTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }

  return { tasks, filter, setFilter, removeTask };
}
