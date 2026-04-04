import AppButton from "@/components/ui/AppButton";
import { Box, Heading } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Box>
      <Heading as="h1">Sorry..We don’t have what you’re looking for</Heading>
      <AppButton >Back to the HomePage</AppButton>
    </Box>
  );
};

export default NotFoundPage;
