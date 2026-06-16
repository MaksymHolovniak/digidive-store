import type { Category } from "@/types/category.types";
import { protectedApi } from "./protected.api";
import { publicApi } from "./public.api";

export const publicCategoryApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/category",
      providesTags: ["Categories"],
    }),
  }),
});

export const adminCategoryApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, FormData>({
      query: (formData) => ({
        url: "/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(publicCategoryApi.util.invalidateTags(["Categories"]));
        } catch {}
      },
    }),
    updateCategory: builder.mutation<Category, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(publicCategoryApi.util.invalidateTags(["Categories"]));
        } catch {}
      },
    }),
    deleteCategory: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(publicCategoryApi.util.invalidateTags(["Categories"]));
        } catch {}
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = publicCategoryApi;

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = adminCategoryApi;
