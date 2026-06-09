import AppContainer from "@/components/ui/AppContainer";
import { Box, Flex, Text } from "@chakra-ui/react";
import CartHeader from "@/components/cart/CartHeader";
import CartTable from "@/components/cart/CartTable";
import CartSummary from "@/components/cart/CartSummary";
import { useGetCartQuery } from "@/store/api/cart.api";
import PageLoader from "@/components/ui/PageLoader";

const CartPage = () => {
  const { data: cartData, isLoading, error } = useGetCartQuery();

  if (isLoading) return <PageLoader />;

  if (error || !cartData || cartData.items.length === 0) {
    return (
      <AppContainer>
        <Text color="gray.500" textAlign="center" py="100px" fontSize="20px">
          Your cart is empty.
        </Text>
      </AppContainer>
    );
  }

  return (
    <Box pt="60px" pb="140px">
      <AppContainer>
        <Flex align="flex-start" gap="60px">
          <Box flex="1">
            <Flex direction="column" gap="20px">
              <CartHeader />
              <CartTable items={cartData.items} />
            </Flex>
          </Box>
          <CartSummary
            itemsTotal={cartData.itemsTotal}
            deliveryFee={cartData.deliveryFee}
            totalPrice={cartData.totalPrice}
          />
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default CartPage;
