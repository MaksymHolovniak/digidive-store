import { Box, Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";

const HeaderLogo = () => {
  return (
    <Box>
      <Image src={logo} alt="DigiDive logo" w="200px" h="60px" />
    </Box>
  );
};

export default HeaderLogo;
