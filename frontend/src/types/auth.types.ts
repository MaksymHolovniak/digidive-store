import type { ReactNode } from "react";

export type FullUser = {
  id: number;
  email: string;
  role: "user" | "admin";
}

export type AuthDto = {
  email: string;
  password?: string;
  rememberMe?: boolean;
};

export type SignUpFormValues = AuthDto & {
  confirmPassword?: string;
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

export type FetchBaseQueryError = {
  data?: {
    message?: string;
  };
};
