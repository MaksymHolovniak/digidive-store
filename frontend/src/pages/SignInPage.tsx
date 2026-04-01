import { Checkbox, Flex, Heading, Image, Link } from "@chakra-ui/react";
import signInBg from "../assets/sign-in-bg.jpg";
import logo from "../assets/logo.svg";
import SignForm from "@/features/auth/ui/SignForm";
import AppButton from "@/shared/ui/AppButton";
import SignSubText from "@/features/auth/ui/SignSubText";
import SignLinks from "@/features/auth/ui/SignLinks";

const SignIn = () => {
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
          <Image src={logo} />
          <Heading mt="40px" fontSize="26px">
            Log In
          </Heading>
          <SignForm />
          <Flex justify="space-between" mt="10px" w="100%">
            <Checkbox.Root>
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
