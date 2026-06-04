import type { GetProductsArgs, GetProductsResponse } from "@/types/product.types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsArgs>({
      query: ({ categoryId, page = 1, perPage = 9, ...rest }) => ({
        url: categoryId ? `/product/by-category/${categoryId}` : "/product/all",
        params: {
          page,
          perPage,
          ...rest,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
