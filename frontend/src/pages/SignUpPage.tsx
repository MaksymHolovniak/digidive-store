import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import signUpBg from "../assets/sign-up-bg.jpg";
import logo from "../assets/logo.svg";
import AppButton from "@/shared/ui/AppButton";
import SignSubText from "@/features/auth/ui/SignSubText";
import SignLinks from "@/features/auth/ui/SignLinks";
import SignUpForm from "@/features/auth/ui/SignUpForm";
import AppLink from "@/shared/ui/AppLink";

const SignUpPage = () => {
  return (
    <Flex
      bg="linear-gradient(104deg, #5A19BB 0%, #3323AA 27.33%, #C3308B 96.89%)"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        w="881px"
        maxH="621px"
        h="100%"
        borderRadius="16px"
        direction="row"
        justify="space-between"
        overflow="hidden"
      >
        <Flex
          bg={`url(${signUpBg}) center no-repeat`}
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

        <Flex align="center" direction="column" maxW="440px" w="100%" p="16px 60px" bg="#fff">
          <Image src={logo} />
          <Heading mt="40px" fontSize="26px">
            Create an account
          </Heading>
          <SignUpForm />
          <AppButton fontSize="16px" fontWeight="600" mt="19px" h="42px">
            Create account
          </AppButton>
          <SignSubText />
          <SignLinks showText={false} />
          <Text mt="16px">
            Already have an account?{" "}
            <AppLink
              to="/sign-in"
              color="#9169F7"
              textDecor="underline"
              fontWeight="600"
              fontSize="16px"
              _hover={{ textDecoration: "none", opacity: 0.8 }}
            >
              Log in
            </AppLink>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
