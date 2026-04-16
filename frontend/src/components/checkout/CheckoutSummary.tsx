import { Box, Flex, Heading, Separator, Text } from "@chakra-ui/react";
import ArrowLeft from "../../assets/arrow-left.svg?react";
import AppLink from "../ui/AppLink";

const CheckoutSummary = () => {
  return (
    <Box bgColor="#F8F9FA" p="50px" borderRadius="16px">
      <Heading as="h2" fontSize="24px" mb="30px">
        Summary
      </Heading>
      <Flex direction="column" gap="16px">
        <Flex direction="column" align="center" gap="16px">
          <Flex gap="12px">
            <Text maxW="350px">Smart Automatic Curtain Opener - Remote Control</Text>
            <Text>2</Text>
          </Flex>
          <Flex gap="12px">
            <Text maxW="350px">Home Security Camera WiFi 1080P HD, 10m Night Vision</Text>
            <Text>1</Text>
          </Flex>
        </Flex>
        <Separator />
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
      </Flex>
      <Flex justify="center" mt="30px">
        <AppLink to="/cart" color="#AB8CF9">
          <Flex align="center" gap="20px" textDecor="underline">
            <ArrowLeft />
            Return to the cart
          </Flex>
        </AppLink>
      </Flex>
    </Box>
  );
};

export default CheckoutSummary;
