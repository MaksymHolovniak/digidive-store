import { Center, Grid, Text } from "@chakra-ui/react";
import ProductCard from "../product/product-card/ProductCard";
import type { Product } from "@/types/product.types";

type ProductsListProps = {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  if (products.length === 0) {
    return (
      <Center py="40px">
        <Text fontSize="18px" color="#1D1D1D">
          No products found.
        </Text>
      </Center>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(230px, 1fr))" gap="48px">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsList;
