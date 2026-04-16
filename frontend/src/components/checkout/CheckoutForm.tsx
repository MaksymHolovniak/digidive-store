import { Box, Flex, Heading, NativeSelect } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";

const CheckoutInput = ({ ...props }) => <AppInput h="54px" {...props} />;

const CheckoutForm = () => {
  return (
    <Box p="50px">
      <Heading as="h1" fontSize="24px" mb="36px">
        Delivery Address
      </Heading>
      <Flex gap="50px" mb="40px">
        <Flex direction="column" gap="16px" w="352px">
          <NativeSelect.Root>
            <NativeSelect.Field h="54px" color="#1D1D1D" fontSize="16px">
              <option value="United Kingdom">United Kingdom</option>
              <option value="USA">USA</option>
              <option value="Ukraine">Ukraine</option>
              <option value="Belgium">Belgium</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <CheckoutInput placeholder="Full name" />
          <CheckoutInput placeholder="Company (optional)" />
        </Flex>
        <Flex direction="column" gap="16px" w="380px">
          <CheckoutInput placeholder="Address" />
          <Flex gap="32px">
            <CheckoutInput placeholder="Postcode" />
            <CheckoutInput placeholder="City" />
          </Flex>
          <CheckoutInput placeholder="Phone" />
        </Flex>
      </Flex>
      <Flex justify="center">
        <AppButton w="200px" h="52px" fontSize="20px">
          Confirm payment
        </AppButton>
      </Flex>
    </Box>
  );
};

export default CheckoutForm;
