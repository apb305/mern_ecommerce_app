import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

const AdminRoute = () => {
  const { currentUser } = UseAuth();
  const { isAdmin } = useSelector((state) => state.user.userDetails);

  return currentUser && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
