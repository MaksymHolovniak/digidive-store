import { API_URL } from "@/constants/api.constants";
import {
  type CurrentProduct,
  type GetProductsArgs,
  type GetProductsResponse,
  type GetSimilarProductsArgs,
} from "@/types/product.types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
    getProductById: builder.query<CurrentProduct, number>({
      query: (id) => `/product/${id}`,
    }),

    getSimilarProducts: builder.query<GetProductsResponse, GetSimilarProductsArgs>({
      query: ({ id, page = 1, perPage = 4 }) => ({
        url: `/product/similar/${id}`,
        params: { page, perPage },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetSimilarProductsQuery } = productApi;
