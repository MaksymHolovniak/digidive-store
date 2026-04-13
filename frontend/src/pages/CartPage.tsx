import AppContainer from "@/components/ui/AppContainer";
import { Box, Flex } from "@chakra-ui/react";
import CartHeader from "@/components/cart/CartHeader";
import CartTable from "@/components/cart/CartTable";
import CartSummary from "@/components/cart/CartSummary";

const CartPage = () => {
  return (
    <Box pt="60px" pb="140px">
      <AppContainer>
        <Flex align="flex-start" gap="60px">
          <Box flex="1">
            <Flex direction="column" gap="20px">
              <CartHeader />
              <CartTable />
            </Flex>
          </Box>
          <CartSummary />
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default CartPage;
