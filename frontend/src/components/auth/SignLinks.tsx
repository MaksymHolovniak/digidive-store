import { Flex, Image, AbsoluteCenter, Box, Separator, Text, Button } from "@chakra-ui/react";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import github from "../../assets/github.svg";

type SignLinksProps = {
  variant?: "default" | "minimal";
};

const links = [
  { src: google, alt: "Google" },
  { src: facebook, alt: "Facebook" },
  { src: github, alt: "GitHub" },
];

const SignLinks = ({ variant = "default" }: SignLinksProps) => {
  return (
    <>
      <Box position="relative" w="100%" mt="22px">
        <Separator border="1px #D1D1D1 solid" w="100%" />
        <AbsoluteCenter bg="white" px="2" color="#000">
          or
        </AbsoluteCenter>
      </Box>
      {variant === "default" && (
        <Text mt="22px" alignSelf="flex-start">
          Log in using
        </Text>
      )}
      <Flex justify="space-around" w="208px" mt="16px">
        {links.map((item) => (
          <Button key={item.alt} variant="ghost" p="8px">
            <Image src={item.src} alt={item.alt} />
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default SignLinks;
