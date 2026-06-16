import {
  type CurrentProduct,
  type GetAdminProductsArgs,
  type GetAdminProductsResponse,
  type GetProductsArgs,
  type GetProductsResponse,
  type GetSimilarProductsArgs,
} from "@/types/product.types";
import { protectedApi } from "./protected.api";
import { publicApi } from "./public.api";

export const publicProductApi = publicApi.injectEndpoints({
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
      providesTags: ["Products"],
    }),
    getProductById: builder.query<CurrentProduct, number>({
      query: (id) => `/product/${id}`,
      providesTags: (_, __, id) => [{ type: "Products", id }],
    }),

    getSimilarProducts: builder.query<GetProductsResponse, GetSimilarProductsArgs>({
      query: ({ id, page = 1, perPage = 4 }) => ({
        url: `/product/similar/${id}`,
        params: { page, perPage },
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const adminProductApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<GetAdminProductsResponse, GetAdminProductsArgs>({
      query: ({ page = 1, perPage = 10, searchTerm, showArchived }) => ({
        url: "/product/admin/all",
        params: { page, perPage, searchTerm, showArchived },
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<CurrentProduct, FormData>({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<CurrentProduct, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetSimilarProductsQuery } = publicProductApi;

export const {
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductApi;
