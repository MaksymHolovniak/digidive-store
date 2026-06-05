import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/constants/api.constants";
import Cookies from "js-cookie";
import { saveAuthData, removeAuthData } from "@/utils/auth.helper";
import type { UserResponse } from "@/types/auth.types";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/login/access-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as UserResponse;

        saveAuthData(data);

        result = await baseQuery(args, api, extraOptions);
      } else {
        removeAuthData();
        window.location.href = "/sign-in";
      }
    } else {
      removeAuthData();
      window.location.href = "/sign-in";
    }
  }

  return result;
};

export const protectedApi = createApi({
  reducerPath: "protectedApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserProfile"],
  endpoints: () => ({}),
});
