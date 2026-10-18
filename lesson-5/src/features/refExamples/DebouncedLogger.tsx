import { useEffect, useRef } from 'react';
import styles from './RefExamples.module.css';

export const DebouncedLogger = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      console.log('Текущее значение: ', newValue);
      timerRef.current = null;
    }, 1000);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Вывод с задержкой</h2>
      <label className={styles.label} htmlFor="debounced-input">
        Текст
      </label>
      <input
        id="debounced-input"
        className={styles.input}
        placeholder="Начните печатать"
        type="text"
        onChange={handleInputChange}
      />
    </section>
  );
};
