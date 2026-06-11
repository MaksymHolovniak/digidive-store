import { Flex, Image, AbsoluteCenter, Box, Separator, Text, Button } from "@chakra-ui/react";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import github from "../../assets/github.svg";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "@/store/api/auth.api";
import { useGoogleLogin } from "@react-oauth/google";
import { setUser } from "@/store/slices/auth.slice";
import { toaster } from "../ui/toaster";

type SignLinksProps = {
  variant?: "default" | "minimal";
};

const SignLinks = ({ variant = "default" }: SignLinksProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [googleLoginApi] = useGoogleLoginMutation();

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const response = await googleLoginApi({ token: codeResponse.code }).unwrap();

        dispatch(setUser(response.user));
        toaster.create({
          title: "Success",
          description: "Logged in via Google successfully!",
          type: "success",
        });
        navigate("/");
      } catch {
        toaster.create({
          title: "Auth Error",
          description: "Failed to authenticate via Google",
          type: "error",
        });
      }
    },
    onError: () => {
      toaster.create({
        title: "Auth Error",
        description: "Google Login Window Closed",
        type: "error",
      });
    },
  });

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
        <Button variant="ghost" p="8px" onClick={() => handleGoogleLogin()}>
          <Image src={google} alt="Google" />
        </Button>
        <Button variant="ghost" p="8px" disabled>
          <Image src={facebook} alt="Facebook" />
        </Button>
        <Button variant="ghost" p="8px" disabled>
          <Image src={github} alt="GitHub" />
        </Button>
      </Flex>
    </>
  );
};

export default SignLinks;
