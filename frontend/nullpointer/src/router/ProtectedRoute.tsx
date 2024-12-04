import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

interface ProtectedRouteProps {
    children: JSX.Element;
    redirectTo?: string;
}

const ProtectedRoute = ({ children, redirectTo = "/login" }: ProtectedRouteProps) => {
    const { authenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div></div>;
    }

    if (!authenticated) {
        return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
    }

    return children;
}

export default ProtectedRoute;