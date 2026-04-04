import { Flex, Heading } from "@chakra-ui/react";

type SignBannerProps = {
  bgImage: string;
};

const SignBanner = ({ bgImage }: SignBannerProps) => {
  return (
    <Flex
      bg={`url(${bgImage}) center no-repeat`}
      bgSize="cover"
      maxW="440px"
      w="100%"
      align="center"
      justify="center"
      color="#fff"
      overflow="hidden"
    >
      <Heading fontSize="48px">Welcome</Heading>
    </Flex>
  );
};

export default SignBanner;
