import Header from "@/components/layouts/header/Header";
import AppButton from "@/components/ui/AppButton";
import { Box, Flex, Heading, Image, Span } from "@chakra-ui/react";
import notFoundBanner from "../assets/not-found-banner.jpg";
import backArrow from "../assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Flex
        justifyContent="center"
        mt="120px"
        direction="column"
        align="center"
        textAlign="center"
        gap="10px"
      >
        <Heading as="h1" fontSize="34px" maxW="400px">
          Sorry, we couldn’t find what you’re <Span color="#EC5851">looking for</Span>
        </Heading>
        <Image src={notFoundBanner} alt="Not Found Banner" />
        <AppButton
          p="16px 32px"
          h="52px"
          fontSize="16px"
          _hover={{
            transform: "translateY(2px)",
          }}
          onClick={() => navigate("/", { replace: true })}
        >
          Back to the HomePage
          <Image src={backArrow} alt="Back Arrow" />
        </AppButton>
      </Flex>
    </Box>
  );
};

export default NotFoundPage;
