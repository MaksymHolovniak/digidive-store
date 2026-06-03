import type { FullUser } from "@/types/auth.types";
import { getUserFromStorage, removeAuthData } from "@/utils/auth.helper";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: FullUser | null;
  isAuth: boolean;
};

const initialUser = getUserFromStorage();

const initialState: AuthState = {
  user: initialUser,
  isAuth: !!initialUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;

      removeAuthData();
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
