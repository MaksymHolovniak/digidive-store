import { Flex, Image, AbsoluteCenter, Box, Separator, Text, Button } from "@chakra-ui/react";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGithubLoginMutation, useGoogleLoginMutation } from "@/store/api/auth.api";
import { useGoogleLogin } from "@react-oauth/google";
import { setUser } from "@/store/slices/auth.slice";
import { toaster } from "../ui/toaster";
import { useEffect, useRef } from "react";

type SignLinksProps = {
  variant?: "default" | "minimal";
};

const SignLinks = ({ variant = "default" }: SignLinksProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [googleLoginApi] = useGoogleLoginMutation();
  const [githubLoginApi] = useGithubLoginMutation();
  const isAuthProcessing = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code || isAuthProcessing.current) return;

    isAuthProcessing.current = true;

    window.history.replaceState({}, document.title, window.location.pathname);

    const handleGithubAuth = async () => {
      try {
        const response = await githubLoginApi({ token: code }).unwrap();
        dispatch(setUser(response.user));
        toaster.create({
          title: "Success",
          description: "Logged in via GitHub successfully!",
          type: "success",
        });
        navigate("/");
      } catch {
        toaster.create({
          title: "Auth Error",
          description: "Failed to authenticate via GitHub",
          type: "error",
        });
      } finally {
        isAuthProcessing.current = false;
      }
    };

    handleGithubAuth();
  }, [searchParams, githubLoginApi, dispatch, navigate]);

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

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = window.location.origin + window.location.pathname;

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
  };

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
        <Button variant="ghost" p="8px" onClick={handleGithubLogin}>
          <Image src={github} alt="GitHub" />
        </Button>
      </Flex>
    </>
  );
};

export default SignLinks;
