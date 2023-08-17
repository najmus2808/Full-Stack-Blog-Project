import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext/AuthContext";

const useAuth = () => {
  const { loggedIn } = useContext(AuthContext);

  const user = { loggedIn };
  return user?.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
