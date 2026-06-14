import BrandForm from "@/components/admin/brands/BrandForm";
import BrandTable from "@/components/admin/brands/BrandTable";
import PageLoader from "@/components/ui/PageLoader";
import { useGetBrandsQuery } from "@/store/api/brand.api";
import type { Brand } from "@/types/product.types";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";

const AdminBrandsPage = () => {
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const { data: brands, isLoading } = useGetBrandsQuery();

  return (
    <Stack gap="24px" width="full">
      <Flex justify="space-between" align="center">
        <Heading size="2xl" color="#464646">
          Brands Management ({brands?.length || 0})
        </Heading>
      </Flex>

      <Flex gap="10" direction={{ base: "column", lg: "row" }} align="flex-start" w="full">
        <BrandForm editingBrand={editingBrand} onCancelEdit={() => setEditingBrand(null)} />
        <Box
          bg="white"
          borderRadius="16px"
          border="1px solid #E2E8F0"
          flex="1"
          w="full"
          overflow="hidden"
          boxShadow="0 2px 12px rgba(0,0,0,0.01)"
        >
          {isLoading ? <PageLoader /> : <BrandTable brands={brands} onEditClick={(brand) => setEditingBrand(brand)} />}
        </Box>
      </Flex>
    </Stack>
  );
};

export default AdminBrandsPage;
