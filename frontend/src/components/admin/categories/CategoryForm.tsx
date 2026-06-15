import { toaster } from "@/components/ui/toaster";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/store/api/category.api";
import type { Category } from "@/types/category.types";
import { Box, Button, Field, Flex, Heading, Input, NativeSelect, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LuCheck, LuPlus, LuX } from "react-icons/lu";

type CategoryFormValues = {
  name: string;
  parentId: string;
  image: FileList | null;
};

type CategoryFormProps = {
  editingCategory: Category | null;
  onCancelEdit: () => void;
  categories: Category[] | undefined;
};

const CategoryForm = ({ editingCategory, onCancelEdit, categories }: CategoryFormProps) => {
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({ defaultValues: { name: "", parentId: "null", image: null } });

  const watchParentId = useWatch({
    control,
    name: "parentId",
  });

  const isSubcategory = watchParentId !== "null" && watchParentId !== "";

  useEffect(() => {
    if (editingCategory) {
      setValue("name", editingCategory.name);
      setValue("parentId", editingCategory.parentId ? String(editingCategory.parentId) : "null");
    } else {
      reset();
    }
  }, [editingCategory, setValue, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      if (data.parentId && data.parentId !== "null") {
        formData.append("parentId", data.parentId);
      } else {
        formData.append("parentId", "");
      }
      if (data.image && data.image[0] && !isSubcategory) {
        formData.append("image", data.image[0]);
      }

      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, formData }).unwrap();
        toaster.create({ title: "Success", description: "Category updated successfully", type: "success" });
        onCancelEdit();
      } else {
        await createCategory(formData).unwrap();
        toaster.create({ title: "Success", description: "Category created successfully", type: "success" });
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
        {editingCategory ? "Edit Category" : "Create New Category"}
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack gap="5" align="flex-start">
          <Field.Root invalid={!!errors.name}>
            <Field.Label fontWeight="500">Category Name</Field.Label>
            <Input
              {...register("name", {
                required: "Category name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              placeholder="Category name"
              bg="#F8F9FA"
              h="44px"
              borderRadius="8px"
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label fontWeight="500">Parent Category (Optional)</Field.Label>
            <NativeSelect.Root bg="#F8F9FA" h="44px" borderRadius="8px">
              <NativeSelect.Field {...register("parentId")}>
                <option value="null">None (Main Category)</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Root>

          {!isSubcategory && (
            <Field.Root invalid={!!errors.image}>
              <Field.Label fontWeight="500">Category Image</Field.Label>
              <Input
                type="file"
                accept="image/*"
                {...register("image")}
                p="8px"
                bg="#F8F9FA"
                h="44px"
                borderRadius="8px"
              />
            </Field.Root>
          )}

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
              {editingCategory ? <LuCheck /> : <LuPlus />}
              {editingCategory ? "Save" : "Create"}
            </Button>
            {editingCategory && (
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

export default CategoryForm;
