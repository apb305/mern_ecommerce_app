import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = UseAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
