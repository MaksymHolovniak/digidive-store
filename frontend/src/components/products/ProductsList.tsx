import { Grid } from "@chakra-ui/react";
import ProductCard from "./product-card/ProductCard";
import products from "../../data/products.json";

const ProductsList = () => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(230px, 1fr))" gap="48px">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsList;
