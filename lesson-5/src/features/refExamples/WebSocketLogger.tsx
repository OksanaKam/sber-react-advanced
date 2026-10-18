import { useEffect, useRef } from 'react';
import styles from './RefExamples.module.css';

export const WebSocketLogger = () => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://echo.websocket.org');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Соединение открыто');
      socket.send('Привет из WebSocketLogger!');
    };

    socket.onmessage = (event) => {
      console.log('Получено сообщение:', event.data);
    };

    socket.onerror = () => {
      console.error('Ошибка WebSocket-соединения');
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>WebSocket</h2>
      <p className={styles.description}>
        При подключении отправляется тестовое сообщение. Ответ сервера
        отображается в консоли браузера.
      </p>
    </section>
  );
};
