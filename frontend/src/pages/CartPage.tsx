import AppContainer from "@/components/ui/AppContainer";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CartHeader from "@/components/cart/CartHeader";
import CartTable from "@/components/cart/CartTable";
import CartSummary from "@/components/cart/CartSummary";
import { useGetCartQuery } from "@/store/api/cart.api";
import PageLoader from "@/components/ui/PageLoader";
import AppButton from "@/components/ui/AppButton";
import { useNavigate } from "react-router-dom";
import arrowRight from '../assets/arrow-right.svg'
import { LuShoppingBag } from "react-icons/lu";

const CartPage = () => {
  const navigate = useNavigate();
  const { data: cartData, isLoading, error } = useGetCartQuery();

  if (isLoading) return <PageLoader />;

  if (error || !cartData || cartData.items.length === 0) {
    return (
      <AppContainer>
        <Flex justifyContent="center" direction="column" align="center" textAlign="center" gap="24px" py="120px">
          <Box color="gray.300" mb="8px">
            <LuShoppingBag size={80} strokeWidth={1.5} />
          </Box>
          <Text color="#000" fontSize="24px">
            Your cart is empty
          </Text>
          <AppButton
            p="16px 32px"
            h="52px"
            fontSize="16px"
            _hover={{
              transform: "translateY(-2px)",
            }}
            onClick={() => navigate("/products", { replace: true })}
          >
            Continue Shopping
            <Image src={arrowRight} alt="Arrow Right" />
          </AppButton>
        </Flex>
      </AppContainer>
    );
  }

  const hasUnavailableItems = cartData.items.some((item) => !item.product.isActive);

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
            isDisabled={hasUnavailableItems}
          />
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default CartPage;
