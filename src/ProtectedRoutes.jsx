import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Context";

const useAuth = () => {
  const { state } = useContext(AuthContext);

  return state?.isLoggedIn;
};

const ProtectedRoutes = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
