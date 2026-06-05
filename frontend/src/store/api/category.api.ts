import { API_URL } from "@/constants/api.constants";
import type { Category } from "@/types/category.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/category"
        })
    })
});

export const {useGetCategoriesQuery} = categoryApi