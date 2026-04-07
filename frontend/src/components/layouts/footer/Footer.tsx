import { Box, Flex, Heading } from "@chakra-ui/react";
import FooterHero from "./FooterHero";
import FooterProducts from "./FooterProducts";
import FooterContacts from "./FooterContacts";
import FooterBar from "./FooterBar";
import AppContainer from "@/components/ui/AppContainer";

const Footer = () => {
  return (
    <Box>
      <Box bg="#1D1D1D" color="#FFF" as="footer" width="100%" p="45px 0 60px">
        <AppContainer>
          <Flex gap="294px" justify="space-between">
            <FooterHero />
            <Flex gap="80px" paddingTop="12px">
              <Flex direction="column" gap="49px">
                <FooterProducts />
                <Heading as="h3" fontSize="18px" fontWeight="600" textTransform="uppercase">
                  Smart Home Services
                </Heading>
              </Flex>
              <FooterContacts />
            </Flex>
          </Flex>
        </AppContainer>
      </Box>
      <FooterBar />
    </Box>
  );
};

export default Footer;
