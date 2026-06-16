import type { Order } from "@/types/order.types";
import { Box, Button, Dialog, Flex, IconButton, Separator, Stack, Table, Text } from "@chakra-ui/react";
import { LuMapPin, LuPhone, LuUser, LuX } from "react-icons/lu";

type OrderDetailsModalProps = {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
};

const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="lg">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="white" borderRadius="16px" p="6" boxShadow="2xl">
          <Dialog.Header borderBottom="1px solid #E2E8F0" pb="4">
            <Flex justify="space-between" align="center">
              <Dialog.Title fontSize="xl" fontWeight="600" color="#464646">
                Order Specifications # {order?.id}
              </Dialog.Title>
              <IconButton variant="ghost" onClick={onClose} color="gray.500">
                <LuX size={20} />
              </IconButton>
            </Flex>
          </Dialog.Header>
          <Dialog.Body py="6">
            <Stack gap="6">
              <Flex direction={{ base: "column", md: "row" }} gap="6">
                <Box flex="1" bg="#F8F9FA" p="4" borderRadius="12px">
                  <Flex align="center" gap="2" mb="2" color="gray.600" fontWeight="600">
                    <LuUser /> Customer Info
                  </Flex>
                  <Text fontWeight="500" color="#464646">
                    {order?.fullName}
                  </Text>
                  <Text fontSize="14px" color="gray.500">
                    Account: {order?.user.email}
                  </Text>
                  {order?.company && (
                    <Text fontSize="13px" color="gray.400">
                      Company: {order?.company}
                    </Text>
                  )}
                  <Flex align="center" gap="1" mt="2" fontSize="14px" color="gray.600">
                    <LuPhone size={14} /> {order?.phone}
                  </Flex>
                </Box>
                <Box flex="1" bg="#F8F9FA" p="4" borderRadius="12px">
                  <Flex align="center" gap="2" mb="2" color="gray.600" fontWeight="600">
                    <LuMapPin /> Shipping Address
                  </Flex>
                  <Text fontWeight="500" color="#464646">
                    {order?.address}
                  </Text>
                  <Text fontSize="14px" color="gray.500">
                    {order?.city}, {order?.postCode}
                  </Text>
                  <Text fontSize="14px" color="gray.500">
                    {order?.country}
                  </Text>
                </Box>
              </Flex>

              <Text fontWeight="600" color="#464646" mb="-2">
                Purchased Products
              </Text>
              <Table.Root size="sm" variant="line">
                <Table.Header bg="#F1F3F5">
                  <Table.Row>
                    <Table.ColumnHeader p="2">Product</Table.ColumnHeader>
                    <Table.ColumnHeader p="2" textAlign="center">
                      Qty
                    </Table.ColumnHeader>
                    <Table.ColumnHeader p="2" textAlign="end">
                      Price
                    </Table.ColumnHeader>
                    <Table.ColumnHeader p="2" textAlign="end">
                      Subtotal
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {order?.items.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell p="2" fontWeight="500" color="#464646">
                        {item.product.name || "Deleted Product"}
                      </Table.Cell>
                      <Table.Cell p="2" textAlign="center">
                        {item.quantity}
                      </Table.Cell>
                      <Table.Cell p="2" textAlign="end">
                        ${Number(item.price).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell p="2" textAlign="end" fontWeight="600">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>

              <Separator colorPalette="gray" />
              <Stack gap="2" align="flex-end" pr="2">
                <Flex gap="10" justify="space-between" width="240px">
                  <Text color="gray.500">Delivery Service:</Text>
                  <Text fontWeight="500">
                    {Number(order?.deliveryFee) > 0 ? `$${Number(order?.deliveryFee).toFixed(2)}` : "Free"}
                  </Text>
                </Flex>
                <Flex gap="10" justify="space-between" width="240px" fontSize="lg" fontWeight="700">
                  <Text color="#464646">Total Paid:</Text>
                  <Text color="#9969FF">${Number(order?.totalPrice).toFixed(2)}</Text>
                </Flex>
              </Stack>
            </Stack>
          </Dialog.Body>

          <Dialog.Footer borderTop="1px solid #E2E8F0" pt="4">
            <Button
              onClick={onClose}
              bg="#9969FF"
              color="white"
              _hover={{ bg: "#8054e3" }}
              px="6"
              h="40px"
              borderRadius="8px"
            >
              Close Overview
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default OrderDetailsModal;
