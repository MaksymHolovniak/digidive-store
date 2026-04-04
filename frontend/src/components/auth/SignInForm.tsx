import { Box, Checkbox, Field, Flex, Input, Link } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";

const SignInForm = () => {
  return (
    <Box w="100%" as="form">
      <Field.Root mt="25px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          fontSize="16px"
          placeholder="Enter your email"
          borderColor="#E4D9FD"
          css={{ "--focus-color": "#9169F7" }}
        />
      </Field.Root>
      <Field.Root mt="16px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Password
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          fontSize="16px"
          placeholder="Enter your password"
          borderColor="#E4D9FD"
          css={{ "--focus-color": "#7449df" }}
        />
      </Field.Root>

      <Flex justify="space-between" mt="10px" w="100%">
        <Checkbox.Root colorPalette="purple">
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
          transform: "translateY(2px)",
        }}
      >
        Log in
      </AppButton>
    </Box>
  );
};

export default SignInForm;
