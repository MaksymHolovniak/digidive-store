import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Brand } from "@/types/product.types";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/api" }),
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brand",
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
