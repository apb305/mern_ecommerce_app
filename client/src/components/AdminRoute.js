import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAuthUser } = useSelector((state) => state.auth);
  const { isAdmin } = useSelector((state) => state.user.userDetails);

  return isAuthUser && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
