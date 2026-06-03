import type { UserResponse } from "@/types/auth.types";
import Cookies from "js-cookie";

export const getUserFromStorage = () => {
  if (typeof window === "undefined") return null;
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
};

export const saveAuthData = (
  data: UserResponse,
  rememberMe: boolean = false,
) => {
  const accessTokenExpiry = rememberMe ? 1 / 96 : undefined; // 15 хв або сесійна кука
  const refreshTokenExpiry = rememberMe ? 7 : undefined;

  Cookies.set("accessToken", data.accessToken, { expires: accessTokenExpiry });
  Cookies.set("refreshToken", data.refreshToken, {
    expires: refreshTokenExpiry,
  });

  localStorage.setItem("user", JSON.stringify(data.user));
};

export const removeAuthData = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  localStorage.removeItem("user");
};
