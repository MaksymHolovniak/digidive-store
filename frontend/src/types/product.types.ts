export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imagePath?: string;
  brand: Brand;
};

export type Brand = {
  id: number;
  name: string;
};

export type GetProductsResponse = {
  products: Product[];
  length: number;
};

export type GetProductsArgs = {
  categoryId: number;
  page?: number;
  perPage?: number;
  sort?: string;
  searchTerm?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type FilterState = {
  searchTerm: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
};

export type SortValue = "cheaper" | "expensive" | "alphabetical" | "default";

export type GridViewType = "grid-2" | "grid-3";