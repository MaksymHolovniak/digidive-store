import { Flex } from "@chakra-ui/react";
import HeaderCart from "./HeaderCart";
import UserIcon from "../../../assets/user.svg?react";
import HeartIcon from "../../../assets/heart.svg?react";
import HeaderActionItem from "./HeaderActionItem";

const HeaderActions = () => {
  return (
    <Flex gap="32px" align="center">
      <HeaderActionItem icon={UserIcon} label="Login" to="/sign-in" />
      <HeaderActionItem icon={HeartIcon} label="Favorites" to="/favorites" />
      <HeaderCart />
    </Flex>
  );
};

export default HeaderActions;
