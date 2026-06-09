import { Box, Field, Flex, Heading, NativeSelect } from "@chakra-ui/react";
import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation, type CreateOrderRequest } from "@/store/api/order.api";
import { useForm } from "react-hook-form";
import { toaster } from "../ui/toaster";
import type { BackendErrorResponse } from "@/types/auth.types";

const CheckoutInput = ({ ...props }) => <AppInput h="54px" {...props} />;

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderRequest>({
    defaultValues: {
      country: "United Kingdom",
      fullName: "",
      company: "",
      city: "",
      address: "",
      postCode: "",
      phone: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createOrder(data).unwrap();
      toaster.create({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order has been created",
        type: "success",
      });

      navigate("/");
    } catch (error) {
      const err = error as BackendErrorResponse;
      const errorMessage = err.data?.message || "Something went wrong while placing your order.";

      toaster.create({
        title: "Checkout Error",
        description: errorMessage,
        type: "error",
      });
    }
  });

  return (
    <Box p="50px" as="form" onSubmit={onSubmit}>
      <Heading as="h1" fontSize="24px" mb="36px">
        Delivery Address
      </Heading>
      <Flex gap="50px" mb="40px">
        <Flex direction="column" gap="16px" w="352px">
          <Field.Root invalid={!!errors.country}>
            <Field.Label fontSize="16px" fontWeight="600">
              Country
              <Field.RequiredIndicator />
            </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                h="54px"
                color="#1D1D1D"
                fontSize="16px"
                {...register("country", { required: "Country is required" })}
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="USA">USA</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Belgium">Belgium</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.fullName}>
            <Field.Label fontSize="16px" fontWeight="600">
              Full Name <Field.RequiredIndicator />
            </Field.Label>
            <CheckoutInput
              placeholder="Full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.company}>
            <Field.Label fontSize="16px" fontWeight="600">
              Company (optional)
            </Field.Label>
            <CheckoutInput placeholder="Company name" {...register("company")} />
          </Field.Root>
        </Flex>

        <Flex direction="column" gap="16px" w="380px">
          <Field.Root invalid={!!errors.address}>
            <Field.Label fontSize="16px" fontWeight="600">
              Address
              <Field.RequiredIndicator />
            </Field.Label>
            <CheckoutInput
              placeholder="Street address, apartment, suite"
              {...register("address", { required: "Address is required" })}
            />
            <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
          </Field.Root>

          <Flex gap="32px">
            <Field.Root invalid={!!errors.postCode}>
              <Field.Label fontSize="16px" fontWeight="600">
                Postcode
                <Field.RequiredIndicator />
              </Field.Label>
              <CheckoutInput placeholder="Postcode" {...register("postCode", { required: "Postcode is required" })} />
              <Field.ErrorText>{errors.postCode?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.city}>
              <Field.Label fontSize="16px" fontWeight="600">
                City
                <Field.RequiredIndicator />
              </Field.Label>
              <CheckoutInput placeholder="City" {...register("city", { required: "City is required" })} />
              <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
            </Field.Root>
          </Flex>
          <Field.Root invalid={!!errors.phone}>
            <Field.Label fontSize="16px" fontWeight="600">
              Phone
              <Field.RequiredIndicator />
            </Field.Label>
            <CheckoutInput
              placeholder="Phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\s-]*$/,
                  message: "Invalid phone format",
                },
              })}
            />
            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
          </Field.Root>
        </Flex>
      </Flex>
      <Flex justify="center">
        <AppButton type="submit" w="200px" h="52px" fontSize="20px" loading={isLoading} disabled={isLoading}>
          Confirm payment
        </AppButton>
      </Flex>
    </Box>
  );
};

export default CheckoutForm;
