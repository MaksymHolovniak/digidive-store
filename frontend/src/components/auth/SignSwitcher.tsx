import { Text } from "@chakra-ui/react";
import AppLink from "../ui/AppLink";

type SignSwitcherProps = {
  variant: "signin" | "signup";
};

const SignSwitcher = ({ variant }: SignSwitcherProps) => {
  return (
    <Text mt="16px">
      {variant === "signin" ? "New to DigiDive?" : "Already have an account?"}{" "}
      <AppLink
        to={variant === "signin" ? "/sign-up" : "/sign-in"}
        color="#9169F7"
        textDecor="underline"
        fontWeight="600"
        fontSize="16px"
        _hover={{ textDecoration: "none", opacity: 0.8 }}
      >
        {variant === "signin" ? "Create an account" : "Log in"}
      </AppLink>
    </Text>
  );
};
export default SignSwitcher;
