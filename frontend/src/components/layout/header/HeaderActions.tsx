import { Flex } from "@chakra-ui/react";
import HeaderUser from "./HeaderUser";
import HeaderCart from "./HeaderCart";

const HeaderActions = () => {
  return (
    <Flex gap="16px" align="center">
      <HeaderUser />
      <HeaderCart />
    </Flex>
  );
};

export default HeaderActions;
