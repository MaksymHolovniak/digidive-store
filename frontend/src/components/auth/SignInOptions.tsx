import { Checkbox, Flex, Link } from "@chakra-ui/react";

const SignInOptions = () => {
  return (
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
  );
};

export default SignInOptions;
