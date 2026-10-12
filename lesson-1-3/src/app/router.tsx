import { Navigate, Route, Routes } from 'react-router';
import { TaskPage } from 'pages/tasks';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/tasks" element={<TaskPage />} />
      <Route
        path="*"
        element={
          <main>
            <h1>Страница не найдена</h1>
            <a href="/tasks">К задачам</a>
          </main>
        }
      />
    </Routes>
  );
}
