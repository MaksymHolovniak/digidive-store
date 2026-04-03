import { Checkbox, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import signInBg from "../assets/sign-in-bg.jpg";
import logo from "../assets/logo-auth.svg";
import SignForm from "@/components/auth/SignInForm";
import SignSubText from "@/components/auth/SignSubText";
import SignLinks from "@/components/auth/SignLinks";
import AppButton from "@/components/ui/AppButton";
import AppLink from "@/components/ui/AppLink";

const SignInPage = () => {
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
          bg={`url(${signInBg}) center no-repeat`}
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
          <Image src={logo} alt="DigiDive logo" />
          <Heading mt="40px" fontSize="26px">
            Log In
          </Heading>
          <SignForm />
          <Flex justify="space-between" mt="10px" w="100%">
            <Checkbox.Root colorPalette="purple">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Remember me</Checkbox.Label>
            </Checkbox.Root>
            <Link textDecor="underline" color="#9169F7" fontWeight="600" fontSize="14px">
              Forgot password
            </Link>
          </Flex>
          <AppButton fontSize="16px" fontWeight="600" mt="19px" h="42px">
            Log in
          </AppButton>
          <SignSubText />
          <SignLinks />
          <Text mt="16px">
            New to DigiDive?{" "}
            <AppLink
              to="/sign-up"
              color="#9169F7"
              textDecor="underline"
              fontWeight="600"
              fontSize="16px"
              _hover={{ textDecoration: "none", opacity: 0.8 }}
            >
              Create an account
            </AppLink>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
