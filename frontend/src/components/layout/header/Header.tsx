import { Box, Flex } from "@chakra-ui/react";
import HeaderLogo from "./HeaderLogo";
import HeaderSwitchLang from "./HeaderSwitchLang";
import HeaderActions from "./HeaderActions";
import HeaderNavMenu from "./HeaderNavMenu";
import HeaderSearch from "./HeaderSearch";



const Header = () => {
  return (
    <Box bg="#191D24" position="relative" as="header" width="100%" p="15px 0">
      <Box margin="0 auto" maxWidth="1552px" p="0 24px" w="100%">
        <Flex color="#F9F9F9" position="relative" gap="33px" align="center" justify="space-between">
          <HeaderLogo />
          <HeaderNavMenu />
          <Box>
            <HeaderSearch />
          </Box>
          <Box>
            <HeaderSwitchLang />
          </Box>
          <HeaderActions />
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
