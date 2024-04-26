import { sample } from "effector";

import { GetProducts, SearchProducts } from "../../services/productService";

import { 
  $brands, 
  $categories, 
  $filteredProducts, 
  $products, 
  $searchTerm, 
  $selectedBrands, 
  $selectedCategory, 
  AppGate, 
  filterByBrandsFx, 
  filterByCategoryFx, 
  getAllProductsFx, 
  searchProducts, 
  searchProductsFx, 
  selectCategory, 
  setSearchTerm, 
  updateBrands
} from ".";
import { Product } from "@/types/Products";
import { FilterByBrandsParams } from "@/types/FilterByBrandsParams";
import { FilterByCategoryParams } from "@/types/FilterByCategoryParams";

getAllProductsFx.use(GetProducts);
searchProductsFx.use(SearchProducts);
filterByCategoryFx.use(({products, category}: FilterByCategoryParams) => {
  return products.filter(product => (product.category === category.replace(' ', '-') || category === 'All'));
})
filterByBrandsFx.use(({products, category, brands}: FilterByBrandsParams) => {
  return products.filter(product => (product.category === category.replace(' ', '-') || category === 'All') && (brands.includes(product.brand)));
});

$products.on([getAllProductsFx.doneData], (_, data) => data);
$filteredProducts.on([getAllProductsFx.doneData, searchProductsFx.doneData, filterByCategoryFx.doneData, filterByBrandsFx.doneData], (_, data) => data);
$categories.on(getAllProductsFx.doneData, (_, data) => {
  var categories: string[] = ["All"];

  if (data != undefined)
    data.forEach(product => {
      var category = product.category.replace('-', ' ');
      if (!categories.includes(category))
        categories.push(category);    
    });

  return categories;
});
$brands.on([getAllProductsFx.doneData, filterByCategoryFx.doneData, searchProductsFx.doneData], (_, data) => {
  var brands: string[] = [];

  if (data != undefined)
    data.forEach((product: Product) => {
      if (!brands.includes(product.brand)){
        brands.push(product.brand);
      }
  });

  return brands;
});

$selectedBrands.on([getAllProductsFx.doneData, filterByCategoryFx.doneData, searchProductsFx.doneData], (_, data) => {
  var brands: string[] = [];

  if (data != undefined)
    data.forEach((product: Product) => {
      if (!brands.includes(product.brand)){
        brands.push(product.brand);
      }
  });

  return brands;
});
$selectedBrands.on(updateBrands, (state, data) => 
  state.includes(data) ? state.filter(brand => brand !== data) : [...state, data]);

$selectedCategory.on(selectCategory, (_, data) => data);
$searchTerm.on(setSearchTerm, (_, data) => data);

sample({
  clock: AppGate.open,
  target: getAllProductsFx
});

sample({
  clock: searchProducts,
  source: $searchTerm,
  target: searchProductsFx
});

sample({
  clock: selectCategory,
  source: $products,
  fn: (products, category) => ({
    products,
    category
  }),
  target: filterByCategoryFx
});

sample({
  clock: updateBrands,
  source: {products: $products, category: $selectedCategory, selectedBrands: $selectedBrands},
  fn: ({products, category, selectedBrands}) => ({
    products,
    category,
    brands: selectedBrands
  }),
  target: filterByBrandsFx
});
