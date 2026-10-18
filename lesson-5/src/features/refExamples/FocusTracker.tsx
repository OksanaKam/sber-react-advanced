import { useRef } from 'react';
import styles from './RefExamples.module.css';

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const transitionCountRef = useRef(0);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const otherInput =
      e.currentTarget === firstInputRef.current
        ? secondInputRef.current
        : firstInputRef.current;

    if (otherInput !== null && e.relatedTarget === otherInput) {
      transitionCountRef.current += 1;
      console.log(
        'Количество переходов между полями:',
        transitionCountRef.current,
      );
    }
  };

  const handleFocus = () => {
    firstInputRef.current?.focus();
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Перевод фокуса</h2>
      <p className={styles.description}>
        Переключайтесь между полями. Количество переходов отображается в
        консоли.
      </p>
      <div className={styles.fieldsRow}>
        <div>
          <label className={styles.label} htmlFor="first-input">
            Поле 1
          </label>
          <input
            id="first-input"
            ref={firstInputRef}
            className={styles.input}
            placeholder="Начните печатать"
            type="text"
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="second-input">
            Поле 2
          </label>
          <input
            id="second-input"
            ref={secondInputRef}
            className={styles.input}
            placeholder="Начните печатать"
            type="text"
            onFocus={handleInputFocus}
          />
        </div>
      </div>
      <button className={styles.button} type="button" onClick={handleFocus}>
        Сфокусировать на первом
      </button>
    </section>
  );
};
