import type { CartProduct } from "./product.types";

export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: CartProduct;
};

export type CartResponse = {
  items: CartItem[];
  itemsTotal: number;
  deliveryFee: number;
  totalPrice: number;
};
