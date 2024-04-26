import { Product } from "@/types/Products";
import axios from "axios"

const GET_PRODUCTS = "http://dummyjson.com/products"
const SEARCH_PRODUCTS = "http://dummyjson.com/products/search";

export const GetProducts: () => Promise<Product[]> = async () => {
  const { data } = await axios.get(GET_PRODUCTS);
  return data.products;
}

export const SearchProducts = async (searchTerm: string) => {
  var params = `?q=${searchTerm}`;
  const { data } = await axios.get(SEARCH_PRODUCTS + params);
  return data.products;
}