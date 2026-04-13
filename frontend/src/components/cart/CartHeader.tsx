import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import AppLink from "../ui/AppLink";
import { LuChevronRight } from "react-icons/lu";

const CartHeader = () => {
  return (
    <Box>
      <Flex align="center" justify="space-between" mb="20px">
        <Heading as="h1" fontSize="40px" color="#464646" lineHeight="110%">
          Your cart (3)
        </Heading>
        <AppLink to="/products" color="#9169F7" textDecoration="underline">
          <Flex align="center">
            Continue shopping
            <LuChevronRight color="#000" size={25} />
          </Flex>
        </AppLink>
      </Flex>
      <Text fontSize="16px" lineHeight="140%" color="#EC5851">
        Items in your cart are not reserved. Proceed to checkout to complete your purchase.
      </Text>
    </Box>
  );
};

export default CartHeader;
