import { Box, Flex } from "@chakra-ui/react";
import HeartIcon from "../../../assets/heart.svg?react";
import { useNavigate } from "react-router-dom";

const HeaderFavorites = () => {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      direction="column"
      w="48px"
      textAlign="center"
      marginTop="auto"
      paddingBottom="6px"
      as="button"
      cursor="pointer"
      _hover={{ color: "#9969FF" }}
      transition="color 0.3s"
      onClick={() => navigate("/favorites")}
    >
      <HeartIcon width="24px" height="24px" />
      <Box h="18px">Favorites</Box>
    </Flex>
  );
};

export default HeaderFavorites;
