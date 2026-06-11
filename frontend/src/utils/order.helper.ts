import type { Order } from "@/types/order.types";

export const getStatusColor = (status: Order["status"]): string => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "PAID":
      return "teal";
    case "PROCESSING":
      return "blue";
    case "SHIPPED":
      return "purple";
    case "DELIVERED":
      return "green";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};
