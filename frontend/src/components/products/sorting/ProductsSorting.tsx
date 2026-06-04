import { Box, Flex } from "@chakra-ui/react";
import ProductsSortPlacement from "./ProductsSortPlacement";
import ProductsSortSelect from "./ProductsSortSelect";
import type { GridViewType, SortValue } from "@/types/product.types";

type ProductsSortingProps = {
  totalItems: number;
  sortValue: SortValue;
  onSortChange: (value: SortValue) => void;
  view: GridViewType;
  onViewChange: (view: GridViewType) => void;
};

const ProductsSorting = ({ totalItems, sortValue, onSortChange, view, onViewChange }: ProductsSortingProps) => {
  return (
    <Flex justify="space-between" align="center">
      <ProductsSortPlacement view={view} onViewChange={onViewChange} />
      <Box color="#1D1D1D" h="21px">
        {totalItems} products found
      </Box>
      <ProductsSortSelect value={sortValue} onChange={onSortChange} />
    </Flex>
  );
};

export default ProductsSorting;
