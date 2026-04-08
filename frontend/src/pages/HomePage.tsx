import { Box, Heading, Span, Text } from "@chakra-ui/react";
import homeBg from "../assets/home-bg.jpg";
import AppButton from "@/components/ui/AppButton";
import { LuChevronRight } from "react-icons/lu";

const HomePage = () => {
  return (
    <Box>
      <Box bg={`url(${homeBg}) center no-repeat cover`} color="#fff">
        <Text fontWeight="600">Exclusive Spring Deals on Robot Vacuums</Text>
        <Heading fontSize="64px" paddingBottom="20px" lineHeight="106%">
          <Span>Get Lucky</Span>with Cleaning Home with Care
        </Heading>
        <Text fontSize="20px">
          Don't miss out! Use promo code: <Span color="#EC5851">LUCKY2024</Span>
        </Text>
        <AppButton>
          Discover Special Prices
          <LuChevronRight />
        </AppButton>
      </Box>
    </Box>
  );
};

export default HomePage;
