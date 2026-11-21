import {
  FormWithAsyncSave,
  TodoListOptimistic,
  ActionStateWithReducer,
} from '../../../features/react19Examples';
import styles from './MainPage.module.css';

export function MainPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Практика React 19</h1>
      <FormWithAsyncSave />
      <TodoListOptimistic />
      <ActionStateWithReducer />
    </main>
  );
}
