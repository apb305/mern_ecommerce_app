import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuthUser } = useSelector((state) => state.auth);

  return isAuthUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
