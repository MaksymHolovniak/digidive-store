import { toaster } from "@/components/ui/toaster";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/store/api/category.api";
import type { Category } from "@/types/category.types";
import { Button, Field, Flex, Input, NativeSelect, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LuCheck, LuPlus, LuX } from "react-icons/lu";
import AdminFormWrapper from "../shared/AdminFormWrapper";

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
    clearErrors,
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
      clearErrors()
    } else {
      reset();
    }
  }, [editingCategory, setValue, reset, clearErrors]);

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
    <AdminFormWrapper title={editingCategory ? "Edit Category" : "Create New Category"}>
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
                  {...register("image", { required: "Image is required" })}
                  p="8px"
                  bg="#F8F9FA"
                  h="44px"
                  borderRadius="8px"
                />
                <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
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
    </AdminFormWrapper>
  );
};

export default CategoryForm;
