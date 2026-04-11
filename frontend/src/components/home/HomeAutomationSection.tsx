import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import AppContainer from "../ui/AppContainer";
import homeAutomationBg from "../../assets/home-automation-bg.jpg";
import AppButton from "../ui/AppButton";

const HomeAutomationSection = () => {
  return (
    <Box as="section">
      <AppContainer>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="800px"
          bgImage={`url(${homeAutomationBg})`}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          borderRadius="16px"
          color="white"
        >
          <Heading fontSize="42px" lineHeight="110%" maxW="570px" textAlign="center" mb="16px">
            Start your Smart Home adventure
          </Heading>
          <Text fontSize="20px" mb="64px">
            First steps with smart home automation
          </Text>
          <AppButton fontSize="16px" w="200px" h="40px" borderRadius="8px">
            Discover
          </AppButton>
        </Flex>
      </AppContainer>
    </Box>
  );
};
export default HomeAutomationSection;
