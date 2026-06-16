import type { UserOrder } from "./user.types";

export type CreateOrderRequest = {
  country: string;
  fullName: string;
  company?: string;
  city: string;
  address: string;
  postCode: string;
  phone: string;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
    imagePath: string;
  };
};

export type Order = {
  id: number;
  createdAt: string;
  totalPrice: string;
  deliveryFee: string;
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  country: string;
  city: string;
  address: string;
  postCode: string;
  phone: string;
  company?: string;
  fullName: string;
  items: OrderItem[];
  user: UserOrder;
};