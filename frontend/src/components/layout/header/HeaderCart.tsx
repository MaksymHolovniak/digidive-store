import { Box, Flex } from "@chakra-ui/react";
import CartIcon from "../../../assets/cart.svg?react";

const HeaderCart = () => {
  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      w="52px"
      h="61px"
      p="13px 12.5px 0px 7.5px"
      textAlign="center"
      cursor="pointer"
      _hover={{
        "& .cartIcon": { color: "#9969FF" },
        "& .cartText": { color: "#9969FF" },
      }}
      transition="color 0.3s"
    >
      <CartIcon className="cartIcon" style={{ transition: "color 0.3s" }} />
      <Box h="18px" className="cartText" transition="color 0.3s">
        Cart
      </Box>
      <Box
        position="absolute"
        textAlign="center"
        bg="#FF4B4B"
        top="0"
        right="0"
        w="25px"
        h="25px"
        borderRadius="50%"
      >
        3
      </Box>
    </Flex>
  );
};

export default HeaderCart;
