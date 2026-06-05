import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Brand } from "@/types/product.types";
import { API_URL } from "@/constants/api.constants";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brand",
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
