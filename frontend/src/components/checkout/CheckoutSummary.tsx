import { Box, Flex, Heading, Image, Separator, Text } from "@chakra-ui/react";
import ArrowLeft from "../../assets/arrow-left.svg?react";
import AppLink from "../ui/AppLink";
import { useGetCartQuery } from "@/store/api/cart.api";
import PageLoader from "../ui/PageLoader";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/constants/api.constants";

const CheckoutSummary = () => {
  const { data: cartData, isLoading } = useGetCartQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  const items = cartData?.items || [];
  const itemsTotal = cartData?.itemsTotal || 0;
  const deliveryFee = cartData?.deliveryFee || 0;
  const totalPrice = cartData?.totalPrice || 0;

  return (
    <Box bgColor="#F8F9FA" p="50px" borderRadius="16px" minW="450px" h="fit-content">
      <Heading as="h2" fontSize="24px" mb="30px">
        Summary
      </Heading>
      {items.length > 0 && (
        <Flex align="center" gap="16px" wrap="wrap" mb="24px">
          {items.map((item) => (
            <Link key={item.id} to={`/product/${item.productId}`}>
              <Box
                border="1px solid #E2E8F0"
                borderRadius="12px"
                p="6px"
                bg="#FFF"
                transition="all 0.2s"
                _hover={{
                  transform: "scale(1.05)",
                  borderColor: "#9969FF",
                }}
              >
                <Image
                  src={`${BASE_URL}${item.product.imagePath}`}
                  alt="Test product"
                  w="76px"
                  h="76px"
                  objectFit="contain"
                  mixBlendMode="multiply"
                />
              </Box>
            </Link>
          ))}
        </Flex>
      )}
      <Flex direction="column" gap="16px">
        <Flex direction="column" gap="16px" maxH="200px" overflowY="auto" pr="20px" >
          {items.map((item) => (
            <Flex key={item.id} justify="space-between" align="center" gap="20px">
              <Text maxW="300px">{item.product.name}</Text>
              <Text>x{item.quantity}</Text>
            </Flex>
          ))}
        </Flex>
        <Separator />
        <Flex fontSize="18px" align="center" fontWeight="600" justify="space-between">
          <Text>Subtotal</Text>
          <Text>$ {itemsTotal}</Text>
        </Flex>
        <Flex fontSize="16px" align="center" justify="space-between">
          <Text>Delivery costs</Text>
          <Text>{deliveryFee > 0 ? `$ ${deliveryFee}` : "Free"}</Text>
        </Flex>
        <Flex fontSize="20px" align="center" fontWeight="600" justify="space-between">
          <Text>Total</Text>
          <Text>$ {totalPrice}</Text>
        </Flex>
      </Flex>
      <Flex justify="center" mt="40px">
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
