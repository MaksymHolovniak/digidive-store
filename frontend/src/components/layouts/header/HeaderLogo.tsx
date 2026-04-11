import { Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/">
      <Image src={logo} alt="DigiDive logo" w="200px" h="60px" />
    </Link>
  );
};

export default HeaderLogo;
