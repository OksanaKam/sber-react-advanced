import { SubscriptionForm } from '../../../features/subscription';
import styles from './MainPage.module.css';
import { ReactHookForm } from '../../../features/react-hook-form';

export const MainPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1>Регистрация</h1>
      <p className={styles.description}>
        Заполните данные для создания аккаунта. Все поля обязательны.
      </p>
      <ReactHookForm />
      <SubscriptionForm />
    </div>
  );
};
