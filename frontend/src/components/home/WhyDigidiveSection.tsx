import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import AppContainer from "@/components/ui/AppContainer";
import smartHomeIllustration from "../../assets/smart-home-illustration.jpg";
import WhyDigidiveItem from "./WhyDigidiveItem";

const items = [
  {
    title: "Services",
    subtitle: "We’re with you from start to finish",
    text: "The services we provide take all the work of creating your secure, smart home. We'll customize your security system and keep your home secure with 24/7 security monitoring.",
  },
  {
    title: "Support and communication",
    subtitle: "Whatever you need, we're here to help",
    text: "Do not know how to choose better product in line with your budget. Just chat or call to connect with us.",
  },
  {
    title: "Brands and products",
    subtitle: "Anything you can imagine",
    text: "We offer a wide range of brands and products to suit your needs and preferences.",
  },
];

const WhyDigidiveSection = () => {
  return (
    <Box as="section">
      <AppContainer>
        <Flex direction="column" gap="16px" py="100px">
          <Heading as="h2" fontSize="42px" lineHeight="110%" textAlign="center">
            Why DigiDive?
          </Heading>
          <Text fontSize="20px" color="#464646" textAlign="center">
            Explore various opportunities with our online store
          </Text>
          <Flex gap="150px" align="center" mt="30px">
            <Image src={smartHomeIllustration} alt="Smart Home Illustration" borderRadius="16px" />
            <Stack gap='13px'>
              {items.map((item) => (
                <WhyDigidiveItem key={item.title} {...item} />
              ))}
            </Stack>
          </Flex>
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default WhyDigidiveSection;
