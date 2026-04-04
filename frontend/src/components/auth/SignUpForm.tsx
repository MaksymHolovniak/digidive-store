import { Box, Field, Input } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";

const SignUpForm = () => {
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
          type="email"
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
          type="password"
        />
      </Field.Root>
      <Field.Root mt="16px" required>
        <Field.Label fontSize="16px" fontWeight="600">
          Confirm password
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          fontSize="16px"
          placeholder="Confirm your password"
          borderColor="#E4D9FD"
          css={{ "--focus-color": "#7449df" }}
          type="password"
        />
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
