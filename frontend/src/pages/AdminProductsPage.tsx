import ProductDrawerForm from "@/components/admin/products/ProductDrawerForm";
import ProductTable from "@/components/admin/products/ProductTable";
import PageLoader from "@/components/ui/PageLoader";
import { useGetAdminProductsQuery } from "@/store/api/product.api";
import type { CurrentProduct } from "@/types/product.types";
import { Box, Button, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { LuPlus, LuSearch } from "react-icons/lu";

const AdminProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CurrentProduct | null>(null);

  const pageSize = 8;

  const { data, isLoading } = useGetAdminProductsQuery({
    page: currentPage,
    perPage: pageSize,
    searchTerm: searchTerm || undefined,
  });

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (product: CurrentProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <Stack gap="24px" width="full">
      <Flex justify="space-between" align="center" width="full">
        <Heading size="2xl" color="#464646">
          Catalog Products ({data?.length || 0})
        </Heading>
        <Button
          bg="#9969FF"
          color="white"
          _hover={{ bg: "#8054e3" }}
          borderRadius="8px"
          h="44px"
          gap="2"
          onClick={handleOpenCreate}
        >
          <LuPlus /> Add Product
        </Button>
      </Flex>

      <Flex gap="4" width="full" bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0" align="center">
        <LuSearch size={18} color="#A0AEC0" />
        <Input
          placeholder="Search products by title, category, or brand name..."
          variant="flushed"
          border="none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Flex>

      <Box
        bg="white"
        borderRadius="16px"
        border="1px solid #E2E8F0"
        w="full"
        overflow="hidden"
        boxShadow="0 2px 12px rgba(0,0,0,0.01)"
      >
        {isLoading ? (
          <PageLoader />
        ) : (
          <ProductTable
            products={data?.products}
            totalCount={data?.length || 0}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onEditClick={handleOpenEdit}
          />
        )}
      </Box>

      <ProductDrawerForm product={selectedProduct} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Stack>
  );
};

export default AdminProductsPage;
