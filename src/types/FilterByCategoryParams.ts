import { Product } from "./Products";

export interface FilterByCategoryParams {
  products: Product[];
  category: string;
}