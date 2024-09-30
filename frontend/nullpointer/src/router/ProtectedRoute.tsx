import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return <div></div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;