import { Flex, Heading, Image } from "@chakra-ui/react";
import logo from "../../assets/logo-auth.svg";

type SignHeaderProps = {
  title: string;
};

const SignHeader = ({ title }: SignHeaderProps) => {
  return (
    <Flex direction="column" align="center">
      <Image src={logo} alt="DigiDive logo" />
      <Heading mt="40px" fontSize="26px" as='h1'>
        {title}
      </Heading>
    </Flex>
  );
};

export default SignHeader;
