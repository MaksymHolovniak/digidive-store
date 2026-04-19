import { Box, Flex } from "@chakra-ui/react";
import LogoLink from "../../ui/LogoLink";
import HeaderActions from "./HeaderActions";
import HeaderNavMenu from "./HeaderNavMenu";
import HeaderSearch from "./HeaderSearch";
import AppContainer from "@/components/ui/AppContainer";

const Header = () => {
  return (
    <Box bg="#191D24" position="relative" as="header" width="100%" p="15px 0">
      <AppContainer>
        <Flex color="#F9F9F9" position="relative" gap="33px" align="center" justify="space-between">
          <LogoLink />
          <HeaderNavMenu />
          <HeaderSearch />
          <HeaderActions />
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default Header;
