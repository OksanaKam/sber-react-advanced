import { useState } from "react";
import styles from "./AuthRouting.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import type { AuthInfo } from "./AuthContext";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch("https://api.v2.react-learning.ru/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Ошибка при авторизации");
      }

      const authInfo: AuthInfo = await response.json();

      login(authInfo);

      navigate("/profile", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Не удалось войти");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.card}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.field}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          className={styles.input}
          type="email"
          name="email"
          placeholder="Электронная почта"
          required
        />
        </div>
        <div className={styles.field}>
        <label htmlFor="login-password">Пароль</label>
        <input
          id="login-password"
          className={styles.input}
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        </div>
        {errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Входим…" : "Войти"}
        </button>
      </form>
    </main>
  );
};