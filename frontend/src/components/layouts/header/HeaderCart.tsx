import { Box, Flex } from "@chakra-ui/react";
import CartIcon from "../../../assets/cart.svg?react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useGetCartQuery } from "@/store/api/cart.api";

const HeaderCart = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const { data: cart } = useGetCartQuery(undefined, {
    skip: !isAuth,
  });

  const totalItems = isAuth && cart ? cart.totalQuantity : 0;

  return (
    <Link to="/cart">
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
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#FF4B4B"
          top="0"
          right="0"
          w="25px"
          h="25px"
          borderRadius="50%"
        >
          {totalItems}
        </Box>
      </Flex>
    </Link>
  );
};

export default HeaderCart;
