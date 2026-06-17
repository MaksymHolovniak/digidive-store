import {
  type AdminProduct,
  type CurrentProduct,
  type GetAdminProductsArgs,
  type GetAdminProductsResponse,
  type GetProductsArgs,
  type GetProductsResponse,
  type GetSimilarProductsArgs,
} from "@/types/product.types";
import { protectedApi } from "./protected.api";
import { publicApi } from "./public.api";
import { orderApi } from "./order.api";
import { cartApi } from "./cart.api";
import { userApi } from "./user.api";

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(publicProductApi.util.invalidateTags(["Products"]));
        } catch {}
      },
    }),
    updateProduct: builder.mutation<CurrentProduct, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(publicProductApi.util.invalidateTags(["Products", { type: "Products", id }]));
          dispatch(cartApi.util.invalidateTags(["Cart"]));
          dispatch(userApi.util.invalidateTags(["UserProfile"]));
        } catch {}
      },
    }),
    toggleProductArchive: builder.mutation<AdminProduct, number>({
      query: (id) => ({
        url: `/product/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(publicProductApi.util.invalidateTags(["Products"]));
          dispatch(orderApi.util.invalidateTags(["Order"]));
          dispatch(cartApi.util.invalidateTags(["Cart"]));
        } catch {}
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetSimilarProductsQuery } = publicProductApi;

export const {
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useToggleProductArchiveMutation,
} = adminProductApi;
