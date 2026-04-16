import { Box, Flex } from "@chakra-ui/react";
import AppContainer from "@/components/ui/AppContainer";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

const CheckoutPage = () => {
  return (
    <Box py="40px">
      <AppContainer>
        <CheckoutStepper />
        <Flex justify="space-between" gap="40px" mt="40px">
          <CheckoutForm />
          <CheckoutSummary />
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default CheckoutPage;
