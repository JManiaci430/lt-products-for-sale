import { createDomain } from 'effector';

import { Product } from '@/types/Products';
import { createGate } from 'effector-react';
import { FilterByBrandsParams as FilterByBrandsParams } from '@/types/FilterByBrandsParams';
import { FilterByCategoryParams } from '@/types/FilterByCategoryParams';

const productDomain = createDomain();
export const AppGate = createGate();

export const $products = productDomain.store<Product[]>([]);
export const $filteredProducts = productDomain.store<Product[]>([]);
export const $categories = productDomain.store<string[]>([]);
export const $brands = productDomain.store<string[]>([]);
export const $selectedBrands = productDomain.store<string[]>([]);
export const $selectedCategory = productDomain.store<string>('All');
export const $searchTerm = productDomain.store<string>('').reset();

export const selectCategory = productDomain.event<string>();
export const setSearchTerm = productDomain.event<string>();
export const searchProducts = productDomain.event<void>();
export const updateBrands = productDomain.event<string>();

export const getAllProductsFx = productDomain.effect<void, Product[]>();
export const searchProductsFx = productDomain.effect<string, Product[]>();
export const filterByCategoryFx = productDomain.effect<FilterByCategoryParams, Product[]>();
export const filterByBrandsFx = productDomain.effect<FilterByBrandsParams, Product[]>();

export const $isProductsLoading = getAllProductsFx.pending || searchProductsFx.pending;