import { toaster } from "@/components/ui/toaster";
import { useDeleteCategoryMutation } from "@/store/api/category.api";
import type { Category } from "@/types/category.types";
import { Button, Flex, IconButton, Table, Text, Image, Badge, Pagination, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { LuPencil, LuTrash2, LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { API_URL } from "@/constants/api.constants";

type CategoryTableProps = {
  categories: Category[] | undefined;
  onEditClick: (category: Category) => void;
};

const CategoryTable = ({ categories, onEditClick }: CategoryTableProps) => {
  const [deletingCatId, setDeletingCatId] = useState<number | null>(null);
  const [deleteCategory] = useDeleteCategoryMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteCategory(id).unwrap();
      toaster.create({ title: "Success", description: "Category deleted successfully", type: "success" });
      setDeletingCatId(null);
    } catch {
      toaster.create({ title: "Error", description: "This category cannot be deleted", type: "error" });
    }
  };

  const flatCategories =
    categories?.reduce((acc: Category[], curr) => {
      acc.push(curr);
      if (curr.children && curr.children.length > 0) {
        curr.children.forEach((child) => {
          acc.push({ ...child, parent: { id: curr.id, name: curr.name } });
        });
      }
      return acc;
    }, []) || [];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCategories = flatCategories.slice(startIndex, endIndex);

  return (
    <Flex direction="column" gap="4">
      <Table.Root size="md" variant="line" striped={false}>
        <Table.Header bg="#F8F9FA">
          <Table.Row>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="80px">
              ID
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="100px">
              Image
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
              Name
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
              Type
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" textAlign="end">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedCategories.map((cat) => (
            <Table.Row key={`${cat.id}-${cat.parentId}`} _hover={{ bg: "#FAF9F6" }} transition="background 0.2s">
              <Table.Cell p="16px 24px" fontWeight="500" color="gray.400" bg="transparent">
                {cat.id}
              </Table.Cell>

              <Table.Cell p="16px 24px">
                {cat.imagePath ? (
                  <Image
                    src={`${API_URL.replace("/api", "")}${cat.imagePath}`}
                    alt={cat.name}
                    boxSize="40px"
                    objectFit="cover"
                    borderRadius="6px"
                  />
                ) : (
                  <Text fontSize="12px" color="gray.400">
                    —
                  </Text>
                )}
              </Table.Cell>

              <Table.Cell p="16px 24px" fontWeight="500" color="#464646">
                {cat.name}
              </Table.Cell>

              <Table.Cell p="16px 24px">
                {cat.parent ? (
                  <Badge colorPalette="blue" variant="subtle">
                    Subcategory of {cat.parent.name}
                  </Badge>
                ) : (
                  <Badge colorPalette="purple" variant="subtle">
                    Main Category
                  </Badge>
                )}
              </Table.Cell>

              <Table.Cell p="16px 24px" textAlign="end">
                <Flex justify="flex-end" gap="2" align="center" h="32px">
                  {deletingCatId === cat.id ? (
                    <Flex gap="2" align="center">
                      <Text fontSize="12px" color="red.500" fontWeight="600" mr="1">
                        Are you sure?
                      </Text>
                      <Button
                        size="sm"
                        h="28px"
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        onClick={() => handleDeleteClick(cat.id)}
                      >
                        Delete
                      </Button>
                      <IconButton
                        variant="outline"
                        size="sm"
                        h="28px"
                        w="28px"
                        color="gray.600"
                        onClick={() => setDeletingCatId(null)}
                        aria-label="Cancel delete"
                      >
                        <LuX size={14} />
                      </IconButton>
                    </Flex>
                  ) : (
                    <>
                      <IconButton
                        variant="ghost"
                        colorPalette="blue"
                        size="sm"
                        onClick={() => onEditClick(cat)}
                        aria-label="Edit category"
                      >
                        <LuPencil size={16} />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        colorPalette="red"
                        size="sm"
                        onClick={() => setDeletingCatId(cat.id)}
                        aria-label="Delete category"
                      >
                        <LuTrash2 size={16} />
                      </IconButton>
                    </>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
          {flatCategories.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center" p="40px" color="gray.400">
                No categories found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {flatCategories.length > pageSize && (
        <Flex p="16px" justify="center" width="full">
          <Pagination.Root
            count={flatCategories.length}
            pageSize={pageSize}
            page={currentPage}
            onPageChange={(e) => setCurrentPage(e.page)}
          >
            <ButtonGroup variant="ghost" size="sm" border="1px solid #D1D1D1" borderRadius="8px" spaceX="0">
              <Pagination.PrevTrigger asChild>
                <IconButton _hover={{ backgroundColor: "#E4D9FD" }}>
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton
                    key={page.value}
                    variant="ghost"
                    bg={page.value === currentPage ? "#E4D9FD" : "transparent"}
                    _selected={{ border: "1px solid #1D1D1D" }}
                    _hover={{ backgroundColor: "#E4D9FD" }}
                    color="#464646"
                  >
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton _hover={{ backgroundColor: "#E4D9FD" }}>
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Flex>
      )}
    </Flex>
  );
};

export default CategoryTable;
