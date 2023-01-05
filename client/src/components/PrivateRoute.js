import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import { UseAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
 const { currentUser } = UseAuth();
  const location = useLocation();

  // if (!currentUser) {
  //   return <Spinner />;
  // }

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

