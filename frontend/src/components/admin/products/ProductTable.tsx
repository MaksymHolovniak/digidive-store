import ProductsPagination from "@/components/products/ProductsPagination";
import { toaster } from "@/components/ui/toaster";
import { BASE_URL } from "@/constants/api.constants";
import { useToggleProductArchiveMutation } from "@/store/api/product.api";
import type { AdminProduct } from "@/types/product.types";
import { Badge, Flex, IconButton, Image, Table, Text } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import DeleteActionCell from "../shared/DeleteActionCell";

type ProductTableProps = {
  products: AdminProduct[] | undefined;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEditClick: (product: AdminProduct) => void;
};

const ProductTable = ({
  products,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onEditClick,
}: ProductTableProps) => {
  const [toggleProductArchive] = useToggleProductArchiveMutation();

  const handleToggleArchive = async (prod: AdminProduct) => {
    try {
      await toggleProductArchive(prod.id).unwrap();
      const textDescription = prod.isActive ? "Product restored successfully" : "Product archived successfully";

      toaster.create({
        title: "Success",
        description: textDescription,
        type: "success",
      });
    } catch {
      toaster.create({
        title: "Error",
        description: "Failed to update product status",
        type: "error",
      });
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Table.Root size="md" variant="line" striped={false}>
        <Table.Header bg="#F8F9FA">
          <Table.Row>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="80px">
              ID
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="100px">
              Preview
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
              Product Name
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
              Price
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
              Stock
            </Table.ColumnHeader>
            <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" textAlign="end">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products?.map((prod) => (
            <Table.Row
              key={prod.id}
              bg={prod.isActive ? "#F5F5F5" : "transparent"}
              _hover={{ bg: "#FAF9F6" }}
              transition="background 0.2s"
            >
              <Table.Cell p="16px 24px" fontWeight="500" color="gray.400">
                {prod.id}
              </Table.Cell>

              <Table.Cell p="16px 24px">
                <Image
                  src={`${BASE_URL}${prod.imagePath}`}
                  alt={prod.name}
                  boxSize="40px"
                  objectFit="cover"
                  borderRadius="6px"
                />
              </Table.Cell>

              <Table.Cell p="16px 24px" fontWeight="500" color="#464646">
                <Flex direction="column">
                  <Flex align="center" gap="2">
                    <Text fontWeight="600">{prod.name}</Text>
                    {prod.isActive && (
                      <Badge colorPalette="red" variant="surface" size="sm">
                        Archived
                      </Badge>
                    )}
                  </Flex>
                  <Text fontSize="12px" color="gray.400">
                    {prod.brand.name}
                  </Text>
                </Flex>
              </Table.Cell>

              <Table.Cell p="16px 24px" fontWeight="600" color="#9969FF">
                ${Number(prod.price).toFixed(2)}
              </Table.Cell>
              <Table.Cell p="16px 24px">
                {prod.stock > 0 ? (
                  <Badge colorPalette="green" variant="subtle">
                    {prod.stock} units
                  </Badge>
                ) : (
                  <Badge colorPalette="red" variant="subtle">
                    Out of Stock
                  </Badge>
                )}
              </Table.Cell>

              <Table.Cell p="16px 24px" textAlign="end">
                <Flex justify="flex-end" gap="2" align="center" h="32px">
                  <IconButton
                    variant="ghost"
                    colorPalette="blue"
                    size="sm"
                    onClick={() => onEditClick(prod)}
                  >
                    <LuPencil size={16} />
                  </IconButton>
                  <DeleteActionCell
                    elementId={prod.id}
                    onDelete={() => handleToggleArchive(prod)}
                    isArchived={prod.isActive}
                    variant="archive"
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {totalCount > pageSize && (
        <Flex p="16px" justify="center" width="full">
          <ProductsPagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ProductTable;
