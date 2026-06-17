import { BASE_URL } from "@/constants/api.constants";
import type { OrderItem } from "@/types/order.types";
import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import ConditionalLink from "../ui/ConditionalLink"; 

type OrderProductItemProps = {
  item: OrderItem;
};

const OrderProductItem = ({ item }: OrderProductItemProps) => {
  const isProductArchived = !item.product.isActive;

  return (
    <ConditionalLink condition={!isProductArchived} to={`/product/${item.product.id}`}>
      <Flex
        align="center"
        justify="space-between"
        bg="#F8F9FA"
        p="12px"
        borderRadius="12px"
        transition="all 0.2s ease-in-out"
        _hover={
          isProductArchived
            ? { bg: "#F1F3F5" } 
            : {
                bg: "#F1F3F5",
                transform: "translateX(4px)",
                "& .product-name": { color: "#9969FF" },
              }
        }
      >
        <Flex align="center" gap="14px">
          <Box bg="#FFF" border="1px solid #E2E8F0" borderRadius="8px" p="4px">
            <Image
              src={`${BASE_URL}${item.product.imagePath}`}
              alt={item.product.name}
              boxSize="54px"
              objectFit="contain"
              mixBlendMode="multiply"
              opacity={isProductArchived ? 0.6 : 1}
              filter={isProductArchived ? "grayscale(40%)" : "none"}
            />
          </Box>
          <Box>
            <Flex align="center" gap="2" wrap="wrap">
              <Text
                className="product-name"
                fontSize="15px"
                fontWeight="500"
                color={isProductArchived ? "gray.500" : "#464646"}
                maxW={{ base: "140px", md: "400px" }}
                transition="color 0.2s"
              >
                {item.product.name}
              </Text>
              {isProductArchived && (
                <Badge colorPalette="gray" variant="surface" size="sm">
                  Unavailable
                </Badge>
              )}
            </Flex>
            <Text fontSize="13px" color="gray.500" mt="2px">
              Qty: {item.quantity}
            </Text>
          </Box>
        </Flex>
        <Text fontWeight="600" fontSize="15px" color="#464646" pr="6px">
          ${(Number(item.price) * item.quantity).toFixed(2)}
        </Text>
      </Flex>
    </ConditionalLink>
  );
};

export default OrderProductItem;
