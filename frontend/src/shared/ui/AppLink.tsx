import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import type { ComponentPropsWithRef } from "react";

type AppLinkProps = ComponentPropsWithRef<typeof RouterLink> &
  ComponentPropsWithRef<typeof ChakraLink>;

const AppLink = ({ children, ...props }: AppLinkProps) => {
  return (
    <ChakraLink
      _focus={{ outline: "none" }}
      _focusVisible={{ outline: "2px solid #9169F7" }}
      as={RouterLink}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default AppLink;
