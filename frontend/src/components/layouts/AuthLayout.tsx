import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  banner: ReactNode;
};

const AuthLayout = ({ children, banner }: AuthLayoutProps) => {
  return (
    <Flex
      bg="linear-gradient(104deg, #5A19BB 0%, #3323AA 27.33%, #C3308B 96.89%)"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex w="881px" maxH="621px" h="100%" borderRadius="16px" overflow="hidden">
        {banner}
        <Flex align="center" direction="column" maxW="440px" w="100%" p="16px 60px" bg="#fff">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
