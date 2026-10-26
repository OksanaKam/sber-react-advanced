import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import styles from "./AuthRouting.module.css";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const { accessToken, name, setUserName, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://api.v2.react-learning.ru/users/me",
          {
            headers: {
              Authorization: accessToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Ошибка при авторизации");
        }
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Не удалось войти",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [accessToken, setUserName]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className={styles.card}>
      <h1 className={styles.title}>
        {!isLoading && !errorMessage
          ? `Страница профиля пользователя ${name}`
          : "Профиль"}
      </h1>
      {isLoading && (
        <p className={styles.description} role="status">
          Загрузка профиля…
        </p>
      )}
      {errorMessage && (
        <div className={styles.description}>
          <p className={styles.error} role="alert">
            {errorMessage}
          </p>
        </div>
      )}
      {accessToken && (
        <button className={styles.button} type="button" onClick={handleLogout}>
          Выйти
        </button>
      )}
    </main>
  );
};
