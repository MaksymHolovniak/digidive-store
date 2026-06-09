import { protectedApi } from "./protected.api";

export type CreateOrderRequest = {
  country: string;
  fullName: string;
  company?: string;
  city: string;
  address: string;
  postCode: string;
  phone: string;
};

export const orderApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<unknown, CreateOrderRequest>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
