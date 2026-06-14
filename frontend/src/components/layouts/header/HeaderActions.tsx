import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import HeaderCart from "./HeaderCart";
import ShieldCheckIcon from "../../../assets/shield-check.svg?react";
import UserIcon from "../../../assets/user.svg?react";
import HeartIcon from "../../../assets/heart.svg?react";
import LogoutIcon from "../../../assets/logout.svg?react";
import HeaderActionItem from "./HeaderActionItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutAction } from "@/store/slices/auth.slice";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (location.pathname === "/" && location.state?.triggerLogout) {
      dispatch(logoutAction());
      navigate("/", { replace: true, state: {} });
    }
  }, [location, dispatch, navigate]);

  const handleLogout = () => {
    const protectedRoutes = ["/favorites", "/cart", "/checkout", "/profile", "/admin"];

    if (protectedRoutes.includes(location.pathname)) {
      navigate("/", { state: { triggerLogout: true } });
    } else {
      dispatch(logoutAction());
    }
  };

  return (
    <Flex gap="32px" align="center">
      {isAuth && user?.role === "admin" && <HeaderActionItem icon={ShieldCheckIcon} label="Admin" to="/admin" />}

      <HeaderActionItem icon={UserIcon} label={isAuth ? "Profile" : "Login"} to={isAuth ? "/profile" : "/sign-in"} />

      <HeaderActionItem icon={HeartIcon} label="Favorites" to={isAuth ? "/favorites" : "/sign-in"} />

      <HeaderCart />

      {isAuth && <HeaderActionItem icon={LogoutIcon} label="Log out" onClick={handleLogout} />}
    </Flex>
  );
};

export default HeaderActions;
