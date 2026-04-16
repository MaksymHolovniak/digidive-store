import { Box, Flex, Text } from "@chakra-ui/react";
import StepActive from "../../assets/step-active.svg?react";

const CheckoutStepper = () => {
  const lineWidth = "255px";
  const circleSize = "23px";

  return (
    <Flex justify="center" align="flex-start">
      <Box position="relative" textAlign="center" w={circleSize}>
        <Flex direction="column" align="center">
          <Box w={circleSize} h={circleSize} borderRadius="50%" bgColor="#EC5851" zIndex="1" />
          <Text mt="12px" whiteSpace="nowrap">
            Cart
          </Text>
        </Flex>
        <Box position="absolute" top="11px" left={circleSize} w={lineWidth} h="2px" bg="#EC5851" />
      </Box>
      <Box w={lineWidth} />
      <Box position="relative" textAlign="center" w={circleSize}>
        <Flex direction="column" align="center">
          <StepActive style={{ width: circleSize, height: circleSize }} />
          <Text fontWeight="600" mt="12px" whiteSpace="nowrap">
            Shipping & Checkout
          </Text>
        </Flex>
        <Box position="absolute" top="11px" left={circleSize} w={lineWidth} h="2px" bg="#C4C4C4" />
      </Box>
      <Box w={lineWidth} />
      <Box textAlign="center" w={circleSize}>
        <Flex direction="column" align="center">
          <Box
            w={circleSize}
            h={circleSize}
            borderRadius="50%"
            border="1px solid #C4C4C4"
            bgColor="white"
            zIndex="1"
          />
          <Text color="#C4C4C4" mt="12px" whiteSpace="nowrap">
            Confirmation
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CheckoutStepper;
