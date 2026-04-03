import { Link, Text } from "@chakra-ui/react";

const SignSubText = () => {
  return (
    <Text color="#919191" fontSize="12px" mt="8px">
      By continuing, you agree{" "}
      <Link textDecor="underline" color="#919191">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link textDecor="underline" color="#919191">
        Privacy Policy.
      </Link>
    </Text>
  );
};

export default SignSubText;
