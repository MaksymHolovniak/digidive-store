import type { UserProfile } from "@/types/user.types";
import { protectedApi } from "./protected.api";

export const userApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/user/profile",
      providesTags: ["UserProfile"],
    }),
    toggleFavorite: builder.mutation<{ message: string; statusCode: number }, number>({
      query: (productId) => ({
        url: `/user/profile/favorites/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { useGetProfileQuery ,useToggleFavoriteMutation } = userApi;
