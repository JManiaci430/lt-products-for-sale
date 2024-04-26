import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import * as effector from 'effector-react';

import { Product } from "@/types/Products";
import ProductsPane from "..";

const products: Product[] = [
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

const renderComponent = () => render(<ProductsPane />);

describe('Products Pane', () => {
  const useUnitMock: jest.SpyInstance = jest.spyOn(effector, 'useUnit');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render Product Cards', () => {
    useUnitMock
      .mockReturnValueOnce(products)
      .mockReturnValueOnce(false);

    const { queryByText } = renderComponent();

    products.forEach(product => {
      expect(queryByText(product.title)).toBeVisible();
      expect(queryByText(product.description)).toBeVisible();
      expect(queryByText(`$${product.price}`)).toBeVisible();
      expect(queryByText(`${product.discountPercentage}% off!`)).toBeVisible();
      expect(queryByText(`${product.stock} left in stock`)).toBeVisible();
      expect(queryByText(`${product.rating}/5.00`)).toBeVisible();
    });
  });

  it('should display "No Products Found" when appropriate', () => {
    useUnitMock
      .mockReturnValueOnce([])
      .mockReturnValueOnce(false);

    const { queryByText } = renderComponent();

    expect(queryByText("No Products Found")).toBeVisible();
  });
});