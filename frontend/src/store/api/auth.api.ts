import { API_URL } from "@/constants/api.constants";
import type { AuthDto, UserResponse } from "@/types/auth.types";
import { saveAuthData } from "@/utils/auth.helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, AuthDto>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveAuthData(data);
        } catch {}
      },
    }),
    login: builder.mutation<UserResponse, AuthDto>({
      query: ({ rememberMe: _rememberMe, ...body }) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          saveAuthData(data, arg.rememberMe);
        } catch {}
      },
    }),
    googleLogin: builder.mutation<UserResponse, { token: string }>({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveAuthData(data, true);
        } catch {}
      },
    }),
    githubLogin: builder.mutation<UserResponse, { token: string }>({
      query: (body) => ({
        url: "/auth/github",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveAuthData(data, true);
        } catch {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGoogleLoginMutation, useGithubLoginMutation } = authApi;
