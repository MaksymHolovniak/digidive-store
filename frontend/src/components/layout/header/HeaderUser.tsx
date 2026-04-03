import { Box, Flex } from "@chakra-ui/react";
import UserIcon from "../../../assets/user.svg?react";
import { useNavigate } from "react-router-dom";

const HeaderUser = () => {
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
      onClick={() => navigate("/sign-in")}
    >
      <UserIcon />
      <Box h="18px">Login</Box>
    </Flex>
  );
};

export default HeaderUser;
