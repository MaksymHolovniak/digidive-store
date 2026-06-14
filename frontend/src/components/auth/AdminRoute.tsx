import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);

  if (!isAuth || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
