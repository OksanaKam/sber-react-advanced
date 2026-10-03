import type { Task } from 'entities/task';
import { TaskList } from 'features/taskList';

const initialTasks: Task[] = [
  { id: '1', title: 'Реализовать сущность Task', completed: true },
  { id: '2', title: 'Создать компонент Список задач', completed: true },
  { id: '3', title: 'Проверить домашнее задание', completed: false },
];

export function TaskWidget() {
  return <TaskList initialTasks={initialTasks} />;
}
