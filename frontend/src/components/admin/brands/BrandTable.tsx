import { toaster } from "@/components/ui/toaster";
import { useDeleteBrandMutation } from "@/store/api/brand.api";
import type { Brand } from "@/types/product.types";
import { Button, Flex, IconButton, Table, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuPencil, LuTrash2, LuX } from "react-icons/lu";

type BrandTableProps  = {
  brands: Brand[] | undefined;
  onEditClick: (brand: Brand) => void;
}

const BrandTable = ({ brands, onEditClick }: BrandTableProps) => {
      const [deletingBrandId, setDeletingBrandId] = useState<number | null>(null);
      const [deleteBrand] = useDeleteBrandMutation();
    
    const handleDeleteClick = async (id: number) => {
        try {
          await deleteBrand(id).unwrap();
          toaster.create({ title: "Success", description: "Brand deleted successfully", type: "success" });
          setDeletingBrandId(null);
        } catch {
          toaster.create({ title: "Error", description: "This brand cannot be deleted", type: "error" });
        }
      };

    return (
      <Table.Root size="md" variant="line" striped={false}>
        <Table.Header bg="#F8F9FA">
          <Table.Row>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="80px">
              ID
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
              Brand Name
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" textAlign="end">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {brands?.map((brand) => (
            <Table.Row key={brand.id} _hover={{ bg: "#FAF9F6" }} transition="background 0.2s">
              <Table.Cell p="16px 24px" fontWeight="500" color="gray.400" bg="transparent">
                {brand.id}
              </Table.Cell>
              <Table.Cell p="16px 24px" fontWeight="500" color="#464646">
                {brand.name}
              </Table.Cell>
              <Table.Cell p="16px 24px" textAlign="end">
                <Flex justify="flex-end" gap="2" align="center" h="32px">
                  {deletingBrandId === brand.id ? (
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
                        onClick={() => handleDeleteClick(brand.id)}
                      >
                        Delete
                      </Button>
                      <IconButton
                        variant="outline"
                        size="sm"
                        h="28px"
                        w="28px"
                        color="gray.600"
                        onClick={() => setDeletingBrandId(null)}
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
                        onClick={() => onEditClick(brand)}
                        aria-label="Edit brand"
                      >
                        <LuPencil size={16} />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        colorPalette="red"
                        size="sm"
                        onClick={() => setDeletingBrandId(brand.id)}
                        aria-label="Delete brand"
                      >
                        <LuTrash2 size={16} />
                      </IconButton>
                    </>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
          {brands?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={3} textAlign="center" p="40px" color="gray.400">
                No brands found. Create the first one
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    );
}

export default BrandTable