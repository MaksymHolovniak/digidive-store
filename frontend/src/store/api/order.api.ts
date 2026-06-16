import type { CreateOrderRequest, Order } from "@/types/order.types";
import { protectedApi } from "./protected.api";

export const orderApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ url: string }, CreateOrderRequest>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    confirmOrder: builder.mutation<unknown, { orderId: number }>({
      query: (body) => ({
        url: "/order/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
    getUserOrders: builder.query<Order[], void>({
      query: () => "/order/my",
      providesTags: ["Order"],
    }),
    getAdminOrders: builder.query<Order[], void>({
      query: () => "/order",
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<Order, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useConfirmOrderMutation,
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
