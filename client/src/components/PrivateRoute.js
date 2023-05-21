import { Navigate, Outlet } from "react-router-dom";
// import { UseAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  // const { currentUser } = UseAuth();
  const { isAuthUser } = useSelector((state) => state.authUser);

  return isAuthUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
