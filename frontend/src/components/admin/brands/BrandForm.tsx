import { toaster } from "@/components/ui/toaster";
import { useCreateBrandMutation, useUpdateBrandMutation } from "@/store/api/brand.api";
import type { Brand } from "@/types/product.types";
import { Box, Button, Field, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuPlus, LuX } from "react-icons/lu";

type BrandFormValues = {
  name: string;
};

type BrandFormProps = {
  editingBrand: Brand | null;
  onCancelEdit: () => void;
};

const BrandForm = ({ editingBrand, onCancelEdit }: BrandFormProps) => {
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<BrandFormValues>();

  useEffect(() => {
    if (editingBrand) {
      setValue("name", editingBrand.name);
      clearErrors();
    } else {
      reset();
    }
  }, [editingBrand, setValue, reset, clearErrors]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editingBrand) {
        await updateBrand({ id: editingBrand.id, name: data.name }).unwrap();
        toaster.create({ title: "Success", description: "Brand updated successfully", type: "success" });
        onCancelEdit();
      } else {
        await createBrand({ name: data.name }).unwrap();
        toaster.create({ title: "Success", description: "Brand created successfully", type: "success" });
      }
      reset();
    } catch {
      toaster.create({ title: "Error", description: "Something went wrong", type: "error" });
    }
  });

  return (
    <Box
      bg="white"
      p="30px"
      borderRadius="16px"
      border="1px solid #E2E8F0"
      w={{ base: "100%", lg: "360px" }}
      boxShadow="0 2px 12px rgba(0,0,0,0.01)"
    >
      <Heading size="md" mb="20px" color="#464646">
        {editingBrand ? "Edit Brand" : "Create New Brand"}
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack gap="5" align="flex-start">
          <Field.Root invalid={!!errors.name}>
            <Field.Label fontWeight="500">Brand Name</Field.Label>
            <Input
              {...register("name", {
                required: "Brand name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              placeholder="Brand name"
              bg="#F8F9FA"
              h="44px"
              borderRadius="8px"
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Flex gap="3" w="full">
            <Button
              type="submit"
              bg="#9969FF"
              color="white"
              _hover={{ bg: "#8054e3" }}
              flex="1"
              h="44px"
              borderRadius="8px"
              loading={isCreating || isUpdating}
            >
              {editingBrand ? <LuCheck /> : <LuPlus />}
              {editingBrand ? "Save" : "Create"}
            </Button>
            {editingBrand && (
              <Button variant="outline" onClick={onCancelEdit} h="44px" borderRadius="8px" color="gray.600">
                <LuX /> Cancel
              </Button>
            )}
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default BrandForm;
