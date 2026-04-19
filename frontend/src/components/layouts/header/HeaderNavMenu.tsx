import { Flex } from "@chakra-ui/react";
import HeaderProductsMenu from "./HeaderProductsMenu";
import AppLink from "@/components/ui/AppLink";

const HeaderNavMenu = () => {
  return (
    <Flex as="nav" gap="120px" align="center">
      <AppLink
        to="/"
        color="rgba(249, 249, 249, 1)"
        fontSize="18px"
        _hover={{
          color: "#9169F7",
          textDecoration: "underline",
        }}
      >
        Home
      </AppLink>
      <HeaderProductsMenu />
    </Flex>
  );
};

export default HeaderNavMenu;
