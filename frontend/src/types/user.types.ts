import type { Product } from "./product.types";

export type UserProfile = {
  id: number;
  email: string;
  role: string;
  favorites: {
    id: number;
    product: Product;
  }[];
};
