import type { Category } from "@/types/category.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/api" }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/category"
        })
    })
});

export const {useGetCategoriesQuery} = categoryApi