import { Flex, Text } from "@chakra-ui/react";

const FooterBar = () => {
  return (
    <Flex
      padding="20px 0px 29px"
      gap="16px"
      fontSize="16px"
      fontWeight="400"
      color="#1D1D1D"
      justify="center"
    >
      <Text>Copyright © 2026 DigiDive. All Rights Reserved.</Text>
      <Text textDecoration="underline">Privacy Policy</Text>
      <Text textDecoration="underline">Legal</Text>
      <Text textDecoration="underline">DigiDive Licenses</Text>
    </Flex>
  );
};

export default FooterBar;
