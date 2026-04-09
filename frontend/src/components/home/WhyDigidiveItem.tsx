import { Box, Heading, Separator, Text } from "@chakra-ui/react";

type WhyDigidiveItemProps = {
  title: string;
  subtitle: string;
  text: string;
};

const WhyDigidiveItem = ({ title, subtitle, text }: WhyDigidiveItemProps) => {
  return (
    <Box maxW="440px">
      <Heading as="h3" fontSize="14px" mb="8px" textTransform="uppercase" color="#9169F7">
        {title}
      </Heading>
      <Text fontSize="26px" lineHeight="110%" mb="16px" color="#333333" fontWeight="600">
        {subtitle}
      </Text>
      <Text color="#464646" mb="16px">
        {text}
      </Text>
      <Separator />
    </Box>
  );
};

export default WhyDigidiveItem;
