import type { Order } from "@/types/order.types";

export const STATUS_HEX_COLORS: Record<Order["status"], string> = {
  PENDING: "#DD6B20",
  PAID: "#319795",
  PROCESSING: "#3182CE",
  SHIPPED: "#805AD5",
  DELIVERED: "#38A169",
  CANCELLED: "#E53E3E",
};

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

export const getStatusHexColor = (status: Order["status"]): string => {
  return STATUS_HEX_COLORS[status] || "#4A5568";
};
