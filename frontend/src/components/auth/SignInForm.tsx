import { Field, Input } from "@chakra-ui/react";

const SignForm = () => {
  return (
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
      <Field.Label mt="16px" fontSize="16px" fontWeight="600">
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
  );
};

export default SignForm;
