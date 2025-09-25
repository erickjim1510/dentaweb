import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Si no está autenticado se va pal login
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
