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

export const getStatusHexColor = (status: Order["status"]): string => {
  switch (status) {
    case "PENDING":
      return "#DD6B20";
    case "PAID":
      return "#319795"; 
    case "PROCESSING":
      return "#3182CE";
    case "SHIPPED":
      return "#805AD5"; 
    case "DELIVERED":
      return "#38A169"; 
    case "CANCELLED":
      return "#E53E3E"; 
    default:
      return "#4A5568"; 
  }
};