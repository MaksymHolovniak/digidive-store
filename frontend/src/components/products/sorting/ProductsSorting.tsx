import { Box, Flex } from "@chakra-ui/react";
import ProductsSortPlacement from "./ProductsSortPlacement";
import ProductsSortSelect from "./ProductsSortSelect";

const ProductsSorting = () => {
  return (
    <Flex justify="space-between" align='center'>
      <ProductsSortPlacement />
      <Box color="#1D1D1D" h="21px">
        297 products found
      </Box>
      <ProductsSortSelect />
    </Flex>
  );
};

export default ProductsSorting;
