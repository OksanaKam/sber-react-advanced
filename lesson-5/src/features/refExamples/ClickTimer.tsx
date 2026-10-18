import { useRef } from 'react';
import styles from './RefExamples.module.css';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();

    if (clickDataRef.current.startTime === null) {
      clickDataRef.current.startTime = now;
    }

    clickDataRef.current.clickCount += 1;

    const elapsedTime = (now - clickDataRef.current.startTime) / 1000;

    console.log('Общее количество кликов', clickDataRef.current.clickCount);
    console.log('Прошло времени', elapsedTime);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Таймер кликов</h2>
      <button className={styles.button} type="button" onClick={handleClick}>
        Нажать
      </button>
    </section>
  );
};
