import { Box, Field } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";

const SignUpForm = () => {
  return (
    <Box w="100%" as="form">
      <Field.Root mt="25px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput placeholder="Enter your email" type="email" />
      </Field.Root>
      <Field.Root mt="16px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Password
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput placeholder="Enter your password" type="password" />
      </Field.Root>
      <Field.Root mt="16px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Confirm password
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput placeholder="Confirm your password" type="password" />
      </Field.Root>
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
        Create account
      </AppButton>
    </Box>
  );
};

export default SignUpForm;
