import { Flex, Link, Image, AbsoluteCenter, Box, Separator, Text } from "@chakra-ui/react";
import google from "../../../assets/google.svg";
import facebook from "../../../assets/facebook.svg";
import github from "../../../assets/github.svg";

const SignLinks = () => {
  return (
    <>
      <Box position="relative" w="100%" mt="22px">
        <Separator border="1px #D1D1D1 solid" w="100%" />
        <AbsoluteCenter bg="white" px="2" color="#000">
          or
        </AbsoluteCenter>
      </Box>
      <Text mt="22px" alignSelf="flex-start">
        Log in using
      </Text>
      <Flex justify="space-around" w="208px" mt="16px">
        <Link _hover={{ bg: "#F8F9FA" }} p="8px">
          <Image src={google} />
        </Link>
        <Link _hover={{ bg: "#F8F9FA" }} p="8px">
          <Image src={facebook} />
        </Link>
        <Link _hover={{ bg: "#F8F9FA" }} p="8px">
          <Image src={github} />
        </Link>
      </Flex>
    </>
  );
};

export default SignLinks;
