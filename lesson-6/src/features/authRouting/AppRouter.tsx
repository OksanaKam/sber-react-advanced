import { Route, Routes } from "react-router";
import { LoginPage } from "./LoginPage";
import { PublicPage } from "./PublicPage";
import { ProfilePage } from "./ProfilePage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/public" element={<PublicPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="*"
        element={
          <main>
            <h1>Страница не найдена</h1>
          </main>
        }
      />
    </Routes>
  );
}