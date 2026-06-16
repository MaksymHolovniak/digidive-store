import type { Order } from "@/types/order.types";
import { getStatusColor } from "@/utils/order.helper";
import { Badge, Box, Flex, Separator, Text, Accordion } from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";
import OrderProductItem from "./OrderProductItem";

type OrderItemCardProps = {
  order: Order;
};

const OrderItemCard = ({ order }: OrderItemCardProps) => {
  return (
    <Accordion.Item
      value={String(order.id)}
      bg="#FFF"
      borderRadius="16px"
      border="1px solid #E2E8F0"
      boxShadow="0 2px 12px rgba(0,0,0,0.01)"
      overflow="hidden"
    >
      <Accordion.ItemTrigger p="22px 26px" _hover={{ bg: "#FAF9F6" }} transition="background 0.2s" cursor="pointer">
        <Flex justify="space-between" align="center" wrap="wrap" gap="12px" width="100%" pr="8px">
          <Flex align="center" gap="24px" wrap="wrap">
            <Text fontWeight="600" fontSize="17px" color="#464646">
              Order #{order.id}
            </Text>
            <Flex align="center" gap="6px" color="gray.400" fontSize="13px">
              <LuCalendar size={14} />
              <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
            </Flex>
          </Flex>

          <Flex align="center" gap="16px">
            <Badge
              colorPalette={getStatusColor(order.status)}
              fontSize="13px"
              p="6px 14px"
              borderRadius="8px"
              fontWeight="600"
              textTransform="uppercase"
            >
              {order.status}
            </Badge>
            <Accordion.ItemIndicator color="gray.400" />
          </Flex>
        </Flex>
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Box p="0 26px 26px 26px">
          <Separator mb="20px" />

          <Flex direction="column" gap="12px" mb="20px">
            {order.items.map((item) => (
              <OrderProductItem key={item.id} item={item} />
            ))}
          </Flex>

          <Separator />

          <Flex justify="space-between" align="center" mt="16px" fontSize="14px" wrap="wrap" gap="10px">
            <Box color="gray.500">
              Ship to:{" "}
              <Text as="span" color="gray.700" fontWeight="500" textTransform="capitalize">
                {order.country}, {order.city}, {order.address}
              </Text>
            </Box>
            <Text fontWeight="600" fontSize="16px" color="#464646">
              Total Amount:{" "}
              <Text as="span" color="#9969FF" fontSize="19px" ml="4px">
                ${Number(order.totalPrice).toFixed(2)}
              </Text>
            </Text>
          </Flex>
        </Box>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default OrderItemCard;
