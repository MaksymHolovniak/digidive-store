import type { Order } from "@/types/order.types";

export const getStatusColor = (status: Order["status"]): string => {
  switch (status) {
    case "DELIVERED":
      return "green";
    case "PROCESSING":
      return "blue";
    case "SHIPPED":
      return "purple";
    case "PENDING":
      return "orange";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};
