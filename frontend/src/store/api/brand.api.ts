import type { Brand } from "@/types/product.types";
import { protectedApi } from "./protected.api";
import { publicApi } from "./public.api";

export const publicBrandApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brand",
      providesTags: ["Brands"],
    }),
  }),
});

export const adminBrandApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation<Brand, { name: string }>({
      query: (body) => ({
        url: "/brand",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: builder.mutation<Brand, { id: number; name: string }>({
      query: ({ id, ...body }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const { useGetBrandsQuery } = publicBrandApi;

export const { useCreateBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } = adminBrandApi;
