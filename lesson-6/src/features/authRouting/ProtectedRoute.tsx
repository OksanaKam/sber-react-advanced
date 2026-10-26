import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './useAuth';

export const ProtectedRoute = () => {
    const { accessToken } = useAuth();
    const location = useLocation();

    if (!accessToken) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    return <Outlet />;
};