import {Navigate, useLocation} from "react-router";
import useAuth from "../contexts/auth/authContext.tsx";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { session } = useAuth();
    const location = useLocation();

    if (!session) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};
export default ProtectedRoute;