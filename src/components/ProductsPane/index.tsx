import { Card, CircularProgress, Grid, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { $filteredProducts, $isProductsLoading } from "@/model/Products";
import ProductCard from "./ProductCard";

const ProductsPane = () => {
  const products = useUnit($filteredProducts);
  const isProductsLoading = useUnit($isProductsLoading);
  
  return (
    <Card style={{ height: '100%', width: '100%', overflowY: 'auto', textAlign: 'center' }}>
      {isProductsLoading && (
        <CircularProgress size='4rem' />
      )}
      {!isProductsLoading && products.length === 0 && (
        <Card style={{ width: '90%', height: '95%', textAlign: 'center', margin: 'auto', marginTop: '16px' }}>
          <Typography variant='h3' fontWeight='bold'>
            No Products Found
          </Typography>
        </Card>
      )}
      {!isProductsLoading && products.length !== 0 && (
        <Grid 
        container 
        justifyContent="space-around"
        style={{ paddingTop: '16px' }}
        rowSpacing={2}
        >
          {products.map(product => (
            <Grid key={`productcard-${product.id}`} item style={{ height: '90%' }}>
              <ProductCard product={product} />
            </Grid>        
          ))}
        </Grid>
      )}      
    </Card>    
  );    
};

export default ProductsPane;