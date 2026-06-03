import { Box, Checkbox, Field} from "@chakra-ui/react";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth.api";
import { useForm } from "react-hook-form";
import { setUser } from "@/store/slices/auth.slice";
import type { AuthDto, FetchBaseQueryError } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDto>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const isRemembered =
        (data.rememberMe as unknown) === "on" || data.rememberMe === true;

      const formattedData = {
        ...data,
        rememberMe: isRemembered,
      };

      const response = await login(formattedData).unwrap();
      dispatch(setUser(response.user));
      navigate("/");
    } catch (error) {
      const err = error as FetchBaseQueryError;
      alert(err?.data?.message || "Authorization error");
    }
  });

  return (
    <Box w="100%" as="form" onSubmit={onSubmit}>
      <Field.Root mt="25px" invalid={!!errors.email}>
        <Field.Label fontSize="16px" fontWeight="600">
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root mt="16px" invalid={!!errors.password}>
        <Field.Label fontSize="16px" fontWeight="600">
          Password
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
      </Field.Root>

      <Checkbox.Root colorPalette="purple" mt="20px">
        <Checkbox.HiddenInput type="checkbox" {...register("rememberMe")} />
        <Checkbox.Control />
        <Checkbox.Label>Remember me</Checkbox.Label>
      </Checkbox.Root>

      <AppButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        fontSize="16px"
        fontWeight="600"
        mt="19px"
        h="42px"
        w="100%"
        _hover={{
          top: "2px",
        }}
      >
        Log in
      </AppButton>
    </Box>
  );
};

export default SignInForm;
