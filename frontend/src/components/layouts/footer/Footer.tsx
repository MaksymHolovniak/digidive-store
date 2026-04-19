import { Box, Flex } from "@chakra-ui/react";
import FooterHero from "./FooterHero";
import FooterProducts from "./FooterProducts";
import FooterBar from "./FooterBar";
import AppContainer from "@/components/ui/AppContainer";

const Footer = () => {
  return (
    <Box as="footer">
      <Box bg="#1D1D1D" color="#FFF" width="100%" p="45px 0 60px">
        <AppContainer>
          <Flex gap="500px" justify="center">
            <FooterHero />
            <FooterProducts />
          </Flex>
        </AppContainer>
      </Box>
      <FooterBar />
    </Box>
  );
};

export default Footer;
