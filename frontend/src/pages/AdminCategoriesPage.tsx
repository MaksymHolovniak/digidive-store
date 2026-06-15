import CategoryForm from "@/components/admin/categories/CategoryForm";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import PageLoader from "@/components/ui/PageLoader";
import { useGetCategoriesQuery } from "@/store/api/category.api";
import type { Category } from "@/types/category.types";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";

const AdminCategoiesPage = () => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <Stack gap="24px" width="full">
      <Flex justify="space-between" align="center">
        <Heading size="2xl" color="#464646">
          Categories Management ({categories?.length || 0})
        </Heading>
      </Flex>

      <Flex gap="10" direction={{ base: "column", lg: "row" }} align="flex-start" w="full">
        <CategoryForm
          editingCategory={editingCategory}
          onCancelEdit={() => setEditingCategory(null)}
          categories={categories}
        />

        <Box
          bg="white"
          borderRadius="16px"
          border="1px solid #E2E8F0"
          flex="1"
          w="full"
          overflow="hidden"
          boxShadow="0 2px 12px rgba(0,0,0,0.01"
        >
          {isLoading ? (
            <PageLoader />
          ) : (
            <CategoryTable categories={categories} onEditClick={(category) => setEditingCategory(category)} />
          )}
        </Box>
      </Flex>
    </Stack>
  );
};

export default AdminCategoiesPage;
