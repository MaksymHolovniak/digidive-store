import OrderDetailsModal from "@/components/admin/orders/OrderDetailsModal";
import PageLoader from "@/components/ui/PageLoader";
import { toaster } from "@/components/ui/toaster";
import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from "@/store/api/order.api";
import type { Order } from "@/types/order.types";
import { getStatusColor, getStatusHexColor } from "@/utils/order.helper";
import { Box, Button, Flex, Heading, NativeSelect, Stack, Table, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuEye } from "react-icons/lu";

const AdminOrdersPage = () => {
  const { data: orders, isLoading } = useGetAdminOrdersQuery();
  const [updateStatus, { isLoading: isStatusUpdating }] = useUpdateOrderStatusMutation();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toaster.create({ title: "Success", description: "Order status modified", type: "success" });
    } catch {
      toaster.create({ title: "Error", description: "Failed to update status", type: "error" });
    }
  };

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) return <PageLoader />;

  return (
    <Stack gap="24px" width="full">
      <Flex justify="space-between" align="center" width="full">
        <Heading size="2xl" color="#464646">
          Orders Ledger ({orders?.length || 0})
        </Heading>
      </Flex>

      <Box
        bg="white"
        borderRadius="16px"
        border="1px solid #E2E8F0"
        w="full"
        overflow="hidden"
        boxShadow="0 2px 12px rgba(0,0,0,0.01)"
      >
        <Table.Root size="md" variant="line">
          <Table.Header bg="#F8F9FA">
            <Table.Row>
              <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="80px">
                ID
              </Table.ColumnHeader>
              <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
                Customer
              </Table.ColumnHeader>
              <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
                Date
              </Table.ColumnHeader>
              <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600">
                Total
              </Table.ColumnHeader>
              <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" w="180px">
                Status Control
              </Table.ColumnHeader>
              <Table.ColumnHeader p="16px 24px" color="gray.600" fontWeight="600" textAlign="end">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders?.map((order) => (
              <Table.Row key={order.id} _hover={{ bg: "#FAF9F6" }} transition="background 0.2s">
                <Table.Cell p="16px 24px" fontWeight="600" color="gray.400">
                  {order.id}
                </Table.Cell>
                <Table.Cell p="16px 24px">
                  <Flex direction="column">
                    <Text fontWeight="600" color="#464646">
                      {order.fullName}
                    </Text>
                    <Text fontSize="12px" color="gray.400">
                      {order.phone}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell p="16px 24px" color="gray.600">
                  {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Table.Cell>
                <Table.Cell p="16px 24px" fontWeight="600" color="#9969FF">
                  ${Number(order.totalPrice).toFixed(2)}
                </Table.Cell>
                <Table.Cell p="16px 24px">
                  <NativeSelect.Root size="sm" maxW="150px" borderRadius="6px" bg="#F8F9FA" disabled={isStatusUpdating}>
                    <NativeSelect.Field
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      fontWeight="600"
                      color={`${getStatusColor(order.status)}.600`}
                    >
                      <option value="PENDING" style={{ color: getStatusHexColor("PENDING"), fontWeight: "600" }}>
                        Pending
                      </option>
                      <option value="PAID" style={{ color: getStatusHexColor("PAID"), fontWeight: "600" }}>
                        Paid
                      </option>
                      <option value="PROCESSING" style={{ color: getStatusHexColor("PROCESSING"), fontWeight: "600" }}>
                        Processing
                      </option>
                      <option value="SHIPPED" style={{ color: getStatusHexColor("SHIPPED"), fontWeight: "600" }}>
                        Shipped
                      </option>
                      <option value="DELIVERED" style={{ color: getStatusHexColor("DELIVERED"), fontWeight: "600" }}>
                        Delivered
                      </option>
                      <option value="CANCELLED" style={{ color: getStatusHexColor("CANCELLED"), fontWeight: "600" }}>
                        Cancelled
                      </option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Table.Cell>

                <Table.Cell p="16px 24px" textAlign="end">
                  <Button
                    size="sm"
                    variant="subtle"
                    colorPalette="purple"
                    borderRadius="6px"
                    gap="1"
                    onClick={() => handleOpenDetails(order)}
                  >
                    <LuEye /> View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}

            {orders?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center" p="40px" color="gray.400">
                  No orders discovered in the system yet
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
      <OrderDetailsModal order={selectedOrder} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Stack>
  );
};

export default AdminOrdersPage;
