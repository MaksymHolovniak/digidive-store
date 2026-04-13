import { Box, Flex, Text } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";

const CartSummary = () => {
  return (
    <Box maxW="400px" w="100%" bgColor="#F8F9FA" p="30px" position="sticky" top="20px">
      <Text fontSize="16px" color="#9169F7" textTransform="uppercase" lineHeight="130%" mb="16px">
        Summary
      </Text>
      <Flex direction="column" gap="16px" mb="40px">
        <Flex fontSize="18px" align="center" fontWeight="600" justify="space-between">
          <Text>Subtotal</Text>
          <Text>$ 127.98</Text>
        </Flex>
        <Flex fontSize="16px" align="center" justify="space-between">
          <Text>Delivery costs</Text>
          <Text>$ 0.00</Text>
        </Flex>
        <Flex fontSize="20px" align="center" fontWeight="600" justify="space-between">
          <Text>Total</Text>
          <Text>$ 127.98</Text>
        </Flex>
        <Flex direction="column" gap="8px" color="#919191">
          <Text>Free Delivery for order over $150.00 </Text>
          <Text>Delivery time: 2-3 working days</Text>
          <Text>Secure payments</Text>
        </Flex>
      </Flex>
      <Flex justify="center">
        <AppButton w="200px" h="52px" fontSize="20px">
          Checkout
        </AppButton>
      </Flex>
    </Box>
  );
};

export default CartSummary;
