import { Box, Flex } from "@chakra-ui/react";
import ProductsSortPlacement from "./ProductsSortPlacement";
import ProductsSortSelect from "./ProductsSortSelect";

type ProductsSortingProps = {
  totalItems: number;
};

const ProductsSorting = ({ totalItems }: ProductsSortingProps) => {
  return (
    <Flex justify="space-between" align="center">
      <ProductsSortPlacement />
      <Box color="#1D1D1D" h="21px">
        {totalItems} products found
      </Box>
      <ProductsSortSelect />
    </Flex>
  );
};

export default ProductsSorting;
