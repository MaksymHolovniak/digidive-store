import { BASE_URL } from "@/constants/api.constants";
import type { Order } from "@/types/order.types";
import { getStatusColor } from "@/utils/order.helper";
import { Badge, Box, Flex, Image, Separator, Text } from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";
import { Link } from "react-router-dom";

type OrderItemCardProps = {
  order: Order;
};

const OrderItemCard = ({ order }: OrderItemCardProps) => {
  return (
    <Box bg="#FFF" p="26px" borderRadius="16px" border="1px solid #E2E8F0" boxShadow="0 2px 12px rgba(0,0,0,0.01)">
      <Flex justify="space-between" align="center" wrap="wrap" gap="12px" mb="20px">
        <Box>
          <Text fontWeight="600" fontSize="17px" color="#464646">
            Order #{order.id}
          </Text>
          <Flex align="center" gap="6px" color="gray.400" fontSize="13px" mt="4px">
            <LuCalendar size={14} />
            <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
          </Flex>
        </Box>

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
      </Flex>

      <Flex direction="column" gap="12px" mb="20px">
        {order.items.map((item) => (
          <Link key={item.id} to={`/product/${item.product.id}`}>
            <Flex
              key={item.id}
              align="center"
              justify="space-between"
              bg="#F8F9FA"
              p="12px"
              borderRadius="12px"
              transition="all 0.2s ease-in-out"
              _hover={{
                bg: "#F1F3F5",
                transform: "translateX(4px)",
                "& .product-name": { color: "#9969FF" },
              }}
            >
              <Flex align="center" gap="14px">
                <Box bg="#FFF" border="1px solid #E2E8F0" borderRadius="8px" p="4px">
                  <Image
                    src={`${BASE_URL}${item.product.imagePath}`}
                    alt={item.product.name}
                    boxSize="54px"
                    objectFit="contain"
                    mixBlendMode="multiply"
                  />
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="500" color="#464646" maxW={{ base: "160px", md: "450px" }}>
                    {item.product.name}
                  </Text>
                  <Text fontSize="13px" color="gray.500" mt="2px">
                    Qty: {item.quantity}
                  </Text>
                </Box>
              </Flex>
              <Text fontWeight="600" fontSize="15px" color="#464646" pr="6px">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
      <Separator />
      <Flex justify="space-between" align="center" mt="16px" fontSize="14px" wrap="wrap" gap="10px">
        <Box color="gray.500">
          Ship to:{" "}
          <Text as="span" color="gray.700" fontWeight="500">
            {order.city}, {order.address}
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
  );
};

export default OrderItemCard;
