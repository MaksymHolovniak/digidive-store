import { Button } from "@chakra-ui/react";
import type { ReactNode } from "react";

type NavButtonProps = {
  children: ReactNode;
};

const NavButton = ({ children }: NavButtonProps) => {
  return (
    <Button
      p="0"
      fontSize="16px"
      fontWeight="400"
      bg="#191D24"
      color="rgba(249, 249, 249, 1)"
      _hover={{ bg: "#191D24", border: "none" }}
      _active={{ bg: "#191D24" }}
      gap="0px"
    >
      {children}
    </Button>
  );
};

export default NavButton;
