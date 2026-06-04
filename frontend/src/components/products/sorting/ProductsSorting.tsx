import { Box, Flex } from "@chakra-ui/react";
import ProductsSortPlacement from "./ProductsSortPlacement";
import ProductsSortSelect from "./ProductsSortSelect";
import type { SortValue } from "@/types/product.types";

type ProductsSortingProps = {
  totalItems: number;
  sortValue: SortValue;
  onSortChange: (value: SortValue) => void;
};

const ProductsSorting = ({ totalItems, sortValue, onSortChange }: ProductsSortingProps) => {
  return (
    <Flex justify="space-between" align="center">
      <ProductsSortPlacement />
      <Box color="#1D1D1D" h="21px">
        {totalItems} products found
      </Box>
      <ProductsSortSelect value={sortValue} onChange={onSortChange} />
    </Flex>
  );
};

export default ProductsSorting;
