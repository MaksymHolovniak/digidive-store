import { Box, Stack, Text } from "@chakra-ui/react";

type MetricCardProps = {
  title: string;
  value: string | number;
  color: string;
};

const MetricCard = ({ title, value, color }: MetricCardProps) => {
  return (
    <Box
      bg="white"
      p="24px"
      borderRadius="16px"
      border="1px solid #E2E8F0"
      flex="1"
      minW="220px"
      boxShadow="0 2px 10px rgba(0,0,0,0.01)"
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" left="0" top="0" h="full" w="4px" bg={color} />
      <Stack gap="1">
        <Text fontSize="14px" fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wider">
          {title}
        </Text>
        <Text fontSize="28px" fontWeight="700" color="#464646">
          {value}
        </Text>
      </Stack>
    </Box>
  );
};

export default MetricCard;
