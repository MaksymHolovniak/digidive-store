import { Box, Field } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/store/api/auth.api";
import { useForm, useWatch } from "react-hook-form";
import { setUser } from "@/store/slices/auth.slice";
import type { BackendErrorResponse, SignUpFormValues } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email, password } = data;
      const response = await registerUser({ email, password }).unwrap();

      dispatch(setUser(response.user));

      toaster.create({
        title: "Success",
        description: "Your account has been successfully created!",
        type: "success",
      });
      navigate("/");
    } catch (error) {
      const err = error as BackendErrorResponse;
      const errorMessage = err.data?.message || "Authorization error";

      toaster.create({
        title: "Registration Error",
        description: errorMessage,
        type: "error",
      });
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
          type="email"
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
      <Field.Root mt="16px" invalid={!!errors.confirmPassword}>
        <Field.Label fontSize="16px" fontWeight="600">
          Confirm password
          <Field.RequiredIndicator />
        </Field.Label>
        <AppInput
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Confirm password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match.",
          })}
        />
        <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
      </Field.Root>
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
        Create account
      </AppButton>
    </Box>
  );
};

export default SignUpForm;
