import {
  ClickTimer,
  DebouncedLogger,
  FocusTracker,
  PreviousInput,
  WebSocketLogger,
} from '../../../features/refExamples';

import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Практика useRef</h1>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
      <DebouncedLogger />
      <WebSocketLogger />
    </main>
  );
};
