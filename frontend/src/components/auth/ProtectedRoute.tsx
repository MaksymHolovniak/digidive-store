import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
