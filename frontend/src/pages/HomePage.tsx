import { Box, Heading, Span, Text } from "@chakra-ui/react";
import homeHeroBg from "../assets/home-bg.jpg";
import AppButton from "@/components/ui/AppButton";
import { LuChevronRight } from "react-icons/lu";
import AppContainer from "@/components/ui/AppContainer";

const HomePage = () => {
  return (
    <Box>
      <Box
        bgImage={`url(${homeHeroBg})`}
        backgroundPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        color="white"
        py="210px"
      >
        <AppContainer>
          <Text fontWeight="600" mb="32px">
            Advanced Robot Vacuums for Everyday Comfort
          </Text>
          <Heading fontSize="64px" lineHeight="106%" mb="20px" maxW="700px">
            <Span
              background="linear-gradient(131deg, #5fd8ff 0%, #9969ff 64.41%, #704fe5 100%)"
              backgroundClip="text"
            >
              Effortless Cleaning{" "}
            </Span>
            for a Smarter Home Experience
          </Heading>
          <Text fontSize="20px" mb="32px">
            Top Picks <Span color="#EC5851">Available Now</Span>
          </Text>
          <AppButton fontSize="16px" w="250px" h="50px">
            Explore Smart Cleaning <LuChevronRight />
          </AppButton>
        </AppContainer>
      </Box>
    </Box>
  );
};

export default HomePage;
