import ProductCard from "@/components/product/product-card/ProductCard";
import AppContainer from "@/components/ui/AppContainer";
import { Box, Grid, Heading } from "@chakra-ui/react";
import products from "../data/products.json";

const FavoritesPage = () => {
  return (
    <Box pt="60px" pb="140px" as='section'>
      <AppContainer>
        <Heading as="h1" fontSize="40px" color="#464646" lineHeight="110%" mb="30px">
          Your favorites (3)
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(230px, 1fr))" gap="50px">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>
      </AppContainer>
    </Box>
  );
};

export default FavoritesPage;
