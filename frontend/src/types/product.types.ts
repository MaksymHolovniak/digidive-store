import type { Category } from "./category.types";

export type Brand = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imagePath?: string;
  brand: Brand;
};

export type CurrentProduct = {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  stock: number;
  warrantyMonths: number;
  category: Category;
  brand: Brand;
};

export type GetProductsResponse = {
  products: Product[];
  length: number;
};

export type SortValue = "cheaper" | "expensive" | "alphabetical" | "default";
export type GridViewType = "grid-2" | "grid-3";

export type FilterState = {
  searchTerm: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
};

export type GetProductsArgs = {
  categoryId?: number;
  page?: number;
  perPage?: number;
  sort?: Exclude<SortValue, "default">;
  searchTerm?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type GetSimilarProductsArgs = { id: number; perPage?: number; page?: number };

export type CartProduct = {
  name: string;
  imagePath: string;
  price: string;
  stock: number;
  warrantyMonths: number;
  brand: {
    name: string;
  };
};
