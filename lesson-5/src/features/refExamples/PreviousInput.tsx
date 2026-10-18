import { useEffect, useRef, useState } from 'react';
import styles from './RefExamples.module.css';

export const PreviousInput = () => {
  const [value, setValue] = useState('');

  const previousInputRef = useRef<string>('');
  const previousTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (previousTextRef.current) {
      previousTextRef.current.textContent = previousInputRef.current;
    }
    previousInputRef.current = value;
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Предыдущее значение</h2>
      <label className={styles.label} htmlFor="previous-input">
        Текст
      </label>
      <input
        id="previous-input"
        className={styles.input}
        placeholder="Начните печатать"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
      <p className={styles.result}>
        Предыдущее значение:{' '}
        <span className={styles.resultValue} ref={previousTextRef} />
      </p>
    </section>
  );
};
