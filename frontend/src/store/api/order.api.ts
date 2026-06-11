import type { CreateOrderRequest, Order } from "@/types/order.types";
import { protectedApi } from "./protected.api";

export const orderApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<unknown, CreateOrderRequest>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
    getUserOrders: builder.query<Order[], void>({
      query: () => "/order/my",
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrdersQuery } = orderApi;
