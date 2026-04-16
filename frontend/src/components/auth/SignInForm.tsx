import { Box, Checkbox, Field, Flex, Link } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";

const SignInForm = () => {
  return (
    <Box w="100%" as="form">
      <Field.Root mt="25px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput placeholder="Enter your email" />
      </Field.Root>
      <Field.Root mt="16px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Password
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput type="password" placeholder="Enter your password" />
      </Field.Root>

      <Flex justify="space-between" mt="10px" w="100%">
        <Checkbox.Root colorPalette="purple" mt="10px">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Remember me</Checkbox.Label>
        </Checkbox.Root>
        <Link textDecor="underline" color="#9169F7" fontWeight="600" fontSize="14px">
          Forgot password
        </Link>
      </Flex>

      <AppButton
        fontSize="16px"
        fontWeight="600"
        mt="19px"
        h="42px"
        w="100%"
        _hover={{
          top: "2px",
        }}
      >
        Log in
      </AppButton>
    </Box>
  );
};

export default SignInForm;
