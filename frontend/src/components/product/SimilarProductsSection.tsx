import { Box, Flex, Grid, IconButton, Span, Stack, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ProductCard from "@/components/product/product-card/ProductCard";
import products from "../../data/similarProducts.json";

const SimilarProductsSection = () => {
  return (
    <Box as="section">
      <Stack gap="40px">
        <Flex justify="space-between" align="center">
          <Box>
            <Text textTransform="uppercase" color="#464646">
              enjoy more smart in your home
            </Text>
            <Text fontSize="34px" fontWeight="600" as="h2">
              Look what others <Span color="#3AD7B1">buy smart</Span>
            </Text>
          </Box>
          <Flex gap="20px" align="center">
            <IconButton size="md" borderRadius="50%" bgColor="#FFF" color="#000" borderColor="#000">
              <LuChevronLeft />
            </IconButton>
            <IconButton size="md" borderRadius="50%" bgColor="#FFF" color="#000" borderColor="#000">
              <LuChevronRight />
            </IconButton>
          </Flex>
        </Flex>
        <Grid templateColumns="repeat(auto-fit, minmax(230px, 1fr))" gap="24px">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};
export default SimilarProductsSection;
