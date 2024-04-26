import { Product } from "./Products";

export interface FilterByBrandsParams {
  products: Product[];
  category: string;
  brands: string[];
};