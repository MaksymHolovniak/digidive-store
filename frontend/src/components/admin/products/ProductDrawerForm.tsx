import { toaster } from "@/components/ui/toaster";
import { useGetBrandsQuery } from "@/store/api/brand.api";
import { useGetCategoriesQuery } from "@/store/api/category.api";
import { useCreateProductMutation, useUpdateProductMutation } from "@/store/api/product.api";
import type { Category } from "@/types/category.types";
import type { CurrentProduct } from "@/types/product.types";
import { Button, Drawer, Field, Flex, Input, NativeSelect, Stack, Textarea } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuPlus } from "react-icons/lu";

type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  stock: string;
  warrantyMonths: string;
  brandId: string;
  categoryId: string;
  image: FileList | null;
};

type ProductDrawerFormProps = {
  product: CurrentProduct | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDrawerForm = ({ product, isOpen, onClose }: ProductDrawerFormProps) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const { data: brands } = useGetBrandsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      warrantyMonths: "0",
      brandId: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", String(product.price));
      setValue("stock", String(product.stock));
      setValue("warrantyMonths", String(product.warrantyMonths || 0));
      setValue("brandId", String(product.brand?.id || ""));
      setValue("categoryId", String(product.category?.id || ""));
      setValue("image", null);
    } else {
      reset();
    }
  }, [product, setValue, reset, isOpen]);

  const subCategories =
    categories?.reduce((acc: Category[], curr: Category) => {
      if (curr.children && curr.children.length > 0) {
        curr.children.forEach((child: Category) => {
          acc.push({ ...child, parent: { id: curr.id, name: curr.name } });
        });
      }
      return acc;
    }, []) || [];

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("warrantyMonths", data.warrantyMonths);
      formData.append("brandId", data.brandId);
      formData.append("categoryId", data.categoryId);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (product) {
        await updateProduct({ id: product.id, formData }).unwrap();
        toaster.create({ title: "Success", description: "Product updated successfully", type: "success" });
      } else {
        await createProduct(formData).unwrap();
        toaster.create({ title: "Success", description: "Product created successfully", type: "success" });
      }
      onClose();
      reset();
    } catch {
      toaster.create({ title: "Error", description: "Operation failed. Check data fields", type: "error" });
    }
  });

  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose} size="md" initialFocusEl={() => cancelBtnRef.current}>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content bg="white" h="full" p="6" boxShadow="xl">
          <Drawer.Header borderBottom="1px solid #E2E8F0" pb="4">
            <Drawer.Title fontSize="xl" fontWeight="600" color="#464646">
              {product ? "Edit Product Parameters" : "Register New Product"}
            </Drawer.Title>
          </Drawer.Header>

          <Drawer.Body overflowY="auto" py="6" h="calc(100% - 140px)">
            <form id="product-form" onSubmit={onSubmit}>
              <Stack gap="5">
                <Field.Root invalid={!!errors.name}>
                  <Field.Label fontWeight="500">Product Title</Field.Label>
                  <Input
                    {...register("name", { required: "Title is required" })}
                    placeholder="Product title"
                    bg="#F8F9FA"
                    h="44px"
                    borderRadius="8px"
                  />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.description}>
                  <Field.Label fontWeight="500">Decription (Min 70 chars)</Field.Label>
                  <Textarea
                    {...register("description", {
                      required: "Description is required",
                      minLength: { value: 70, message: "Must be at least 70 characters long" },
                    })}
                    placeholder="Provide techical specifications and detailed features..."
                    bg="#F8F9FA"
                    borderRadius="8px"
                    rows={4}
                  />
                  <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>

                <Flex gap="4">
                  <Field.Root invalid={!!errors.price} flex="1">
                    <Field.Label fontWeight="500">Price ($)</Field.Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("price", { required: "Price is required" })}
                      placeholder="999.99"
                      bg="#F8F9FA"
                      h="44px"
                      borderRadius="8px"
                    />
                    <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.stock} flex="1">
                    <Field.Label fontWeight="500">Stock Qty</Field.Label>
                    <Input
                      type="number"
                      {...register("stock", { required: "Stock quantity is required" })}
                      placeholder="15"
                      bg="#F8F9FA"
                      h="44px"
                      borderRadius="8px"
                    />
                    <Field.ErrorText>{errors.stock?.message}</Field.ErrorText>
                  </Field.Root>
                </Flex>

                <Flex gap="4">
                  <Field.Root invalid={!!errors.brandId} flex="1">
                    <Field.Label fontWeight="500">Brand</Field.Label>
                    <NativeSelect.Root bg="#F8F9FA" h="44px" borderRadius="8px">
                      <NativeSelect.Field {...register("brandId", { required: "Brand is required" })}>
                        <option value="">Select Brand</option>
                        {brands?.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.brandId?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.categoryId} flex="1">
                    <Field.Label fontWeight="500">Category</Field.Label>
                    <NativeSelect.Root bg="#F8F9FA" h="44px" borderRadius="8px">
                      <NativeSelect.Field {...register("categoryId", { required: "Category is required" })}>
                        <option value="">Select Category</option>
                        {subCategories?.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.categoryId?.message}</Field.ErrorText>
                  </Field.Root>
                </Flex>

                <Field.Root>
                  <Field.Label fontWeight="500">Warranty (Months)</Field.Label>
                  <Input
                    type="number"
                    {...register("warrantyMonths")}
                    placeholder="24"
                    bg="#F8F9FA"
                    h="44px"
                    borderRadius="8px"
                  />
                </Field.Root>

                <Field.Root invalid={!!errors.image}>
                  <Field.Label fontWeight="500">Product Image File</Field.Label>
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: product ? false : "Image is required" })}
                    p="8px"
                    bg="#F8F9FA"
                    h="44px"
                    borderRadius="8px"
                  />
                  <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                </Field.Root>
              </Stack>
            </form>
          </Drawer.Body>

          <Drawer.Footer borderTop="1px solid #E2E8F0" pt="4">
            <Flex gap="3" w="full">
              <Button ref={cancelBtnRef} variant="outline" onClick={onClose} h="44px" borderRadius="8px" flex="1">
                Cancel
              </Button>
              <Button
                type="submit"
                form="product-form"
                bg="#9969FF"
                color="white"
                _hover={{ bg: "#8054e3" }}
                h="44px"
                borderRadius="8px"
                flex="1"
                loading={isCreating || isUpdating}
              >
                {product ? <LuCheck /> : <LuPlus />}
                {product ? "Save Changes" : "Create Product"}
              </Button>
            </Flex>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default ProductDrawerForm;
