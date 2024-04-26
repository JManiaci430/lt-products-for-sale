import { allSettled, fork } from "effector";

import { Product } from "@/types/Products";
import { GetProducts, SearchProducts } from "../../services/productService";
import { $brands, $categories, $filteredProducts, $products, $selectedBrands, getAllProductsFx, searchProductsFx, selectCategory } from ".";

import './init';


const mockResponse: Product[] = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
  },
  {
    id: 2,
    title: "iPhone X",
    description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/2/1.jpg",
      "https://cdn.dummyjson.com/product-images/2/2.jpg",
      "https://cdn.dummyjson.com/product-images/2/3.jpg",
      "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
    ]
  },
];

jest.mock('../../services/productService', () => ({
  GetProducts: jest.fn().mockResolvedValue(mockResponse),
  SearchProducts: jest.fn().mockResolvedValue(mockResponse)
}));

describe('Products model', () => {
  it('should call GetProducts when getAllProductsFx is triggered', async () => {
    const scope = fork();

    await allSettled(getAllProductsFx, {
      scope
    });

    expect(GetProducts).toHaveBeenCalled();
  });

  it('should call SearchProducts when searchProductsFx is triggered', async () => {
    const scope = fork();

    await allSettled(searchProductsFx, {
      params: "search term",
      scope
    });

    expect(SearchProducts).toHaveBeenCalled();    
  });

  it('should populate $categories, $brands, and $selectedBrands when getAllProductsFx is successful', async () => {
    const scope = fork({
      handlers: [
        [getAllProductsFx, () => mockResponse]
      ]
    });

    await allSettled(getAllProductsFx, {
      scope
    });

    expect(scope.getState($categories)).toEqual(["All", "smartphones"]);
    expect(scope.getState($brands)).toEqual(["Apple"]);
    expect(scope.getState($selectedBrands)).toEqual(["Apple"]);
  });

  it('should populate $brands and $selectedBrands when searchProductsFx is successful', async () => {
    const scope = fork({
      handlers: [
        [searchProductsFx, () => mockResponse]
      ]
    });

    await allSettled(searchProductsFx, {
      params: "search term",
      scope
    });

    expect(scope.getState($brands)).toEqual(["Apple"]);
    expect(scope.getState($selectedBrands)).toEqual(["Apple"]);
  });

  it('should filter products by category when selectCategory is called', async () => {
    const scope = fork({
      values: [
        [$products, mockResponse]
      ]
    });

    await allSettled(selectCategory, {
      params: "smartphones",
      scope
    });

    expect(scope.getState($filteredProducts)).toEqual(mockResponse);
  });
});