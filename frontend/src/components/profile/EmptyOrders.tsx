import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { LuPackage } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AppButton from "../ui/AppButton";
import arrowRight from "../../assets/arrow-right.svg";

const EmptyOrders = () => {
  const navigate = useNavigate();

  return (
    <Flex
      bg="#FFF"
      direction="column"
      align="center"
      justify="center"
      p="80px"
      borderRadius="16px"
      border="1px solid #E2E8F0"
      textAlign="center"
      gap="24px"
    >
      <Box color="gray.300">
        <LuPackage size={72} strokeWidth={1.5} />
      </Box>
      <Text color="gray.500" fontSize="20px" fontWeight="500">
        You haven't placed any orders yet.
      </Text>
      <AppButton
        h="48px"
        p="0 28px"
        fontSize="15px"
        _hover={{ transform: "translateY(-2px)" }}
        onClick={() => navigate("/products")}
      >
        Start Shopping
        <Image src={arrowRight} alt="Arrow" ml="8px" />
      </AppButton>
    </Flex>
  );
};

export default EmptyOrders;
