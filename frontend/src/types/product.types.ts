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
  categoryId: number;
  page?: number;
  perPage?: number;
  sort?: Exclude<SortValue, "default">;
  searchTerm?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};
