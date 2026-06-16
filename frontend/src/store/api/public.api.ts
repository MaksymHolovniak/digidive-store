import { API_URL } from "@/constants/api.constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Products", "Categories", "Brands"],
  endpoints: () => ({}),
});
