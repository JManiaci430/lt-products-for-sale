import { Box, Card, CardContent, CardHeader, CardMedia, Rating, Stack, Typography } from "@mui/material"

import { Product } from "@/types/Products";

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product } : ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: 'fit-content' }}>
      <CardHeader title={product.title} subheader={product.brand} style={{ height: 'fit-content' }} />
      <CardMedia component="img" src={product.thumbnail} style={{ maxHeight: '200px' }}/>
      <CardContent>
        <Stack direction="column">
          <Typography variant="subtitle2" style={{ height: '10%' }} gutterBottom>
            {product.description}
          </Typography>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Typography variant="body1" paddingRight="4px" gutterBottom>
              {`$${product.price}`}
            </Typography>
            <Typography variant="body2" color="red" fontWeight="bold">
              {`${product.discountPercentage}% off!`}
            </Typography>
          </Box>          
          <Typography variant="body2">
            {`${product.stock} left in stock`}
          </Typography>
          <Box display="flex" alignItems="center" flexDirection="row" justifyContent="center">
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2">
              {`${product.rating}/5.00`}
            </Typography>
          </Box>          
        </Stack>        
      </CardContent>
    </Card>
  )
}

export default ProductCard;