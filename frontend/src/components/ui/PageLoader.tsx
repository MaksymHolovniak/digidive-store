import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const PageLoader = () => {
  return (
    <Center h="400px">
      <VStack colorPalette="teal">
        <Spinner w="60px" h="60px" color="purple.500" />
        <Text fontSize="18px" color="purple.500">
          Loading...
        </Text>
      </VStack>
    </Center>
  );
};

export default PageLoader;
