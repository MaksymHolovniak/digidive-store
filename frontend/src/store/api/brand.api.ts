import type { Brand } from "@/types/product.types";
import { protectedApi } from "./protected.api";

export const brandApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brand",
      providesTags: ["Brands"],
    }),
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

export const { useGetBrandsQuery, useCreateBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } = brandApi;
