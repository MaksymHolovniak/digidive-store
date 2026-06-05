import { Box, Flex, Grid, IconButton, Span, Stack, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ProductCard from "@/components/product/product-card/ProductCard";
import type { Product } from "@/types/product.types";

type SimilarProductsSectionProps = {
  products: Product[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
};

const SimilarProductsSection = ({
  products,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  isLoading,
}: SimilarProductsSectionProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const showControls = totalPages > 1;

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
          {showControls && (
            <Flex gap="20px" align="center">
              <IconButton
                size="md"
                borderRadius="50%"
                bgColor={currentPage === 1 ? "#F3F4F5" : "#FFF"}
                color={currentPage === 1 ? "#A3A3A3" : "#000"}
                borderColor={currentPage === 1 ? "#E4E4E7" : "#000"}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                cursor={currentPage === 1 ? "not-allowed" : "pointer"}
                _hover={currentPage === 1 ? {} : { bgColor: "#F3F4F5" }}
              >
                <LuChevronLeft />
              </IconButton>
              <IconButton
                size="md"
                borderRadius="50%"
                bgColor={currentPage === totalPages ? "#F3F4F5" : "#FFF"}
                color={currentPage === totalPages ? "#A3A3A3" : "#000"}
                borderColor={currentPage === totalPages ? "#E4E4E7" : "#000"}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
                _hover={currentPage === totalPages ? {} : { bgColor: "#F3F4F5" }}
              >
                <LuChevronRight />
              </IconButton>
            </Flex>
          )}
        </Flex>
        {isLoading ? (
          <Text color="gray.400">Loading dynamic suggestions...</Text>
        ) : products.length === 0 ? (
          <Text color="gray.400">No similar products found in this category.</Text>
        ) : (
          <Flex gap="85px" wrap="wrap" justify="flex-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        )}
      </Stack>
    </Box>
  );
};
export default SimilarProductsSection;
