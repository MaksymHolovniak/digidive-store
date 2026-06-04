import type { ReactNode } from "react";

export type UserRole = "user" | "admin";

export type FullUser = {
  id: number;
  email: string;
  role: UserRole;
};

export type AuthDto = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SignUpFormValues = AuthDto & {
  confirmPassword: string;
};

export type AuthLayoutProps = {
  children: ReactNode;
  banner: ReactNode;
};

export type UserResponse = {
  user: FullUser;
  accessToken: string;
  refreshToken: string;
};

export type BackendErrorResponse = {
  data?: {
    message?: string | string[];
    error?: string;
    statusCode?: number;
  };
};
