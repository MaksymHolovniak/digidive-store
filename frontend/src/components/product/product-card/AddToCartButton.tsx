import AppButton from "@/components/ui/AppButton";
import { Box, Image, type ButtonProps } from "@chakra-ui/react";
import { useState } from "react";
import AddedToCart from "../../../assets/added-to-cart.svg";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation } from "@/store/api/cart.api";
import { toaster } from "@/components/ui/toaster";
import type { BackendErrorResponse } from "@/types/auth.types";

type AddToCartButtonProps = ButtonProps & {
  productId: number;
  quantity?: number;
};

const AddToCartButton = ({ productId, quantity = 1, ...props }: AddToCartButtonProps) => {
  const { data: cartData } = useGetCartQuery();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const [isHovered, setIsHovered] = useState(false);

  const isInCart = cartData?.items.some((item) => item.productId === productId) || false;

  const isLoading = isAdding || isRemoving;

  const handleCartAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isInCart) {
        await removeFromCart(productId).unwrap();
        toaster.create({
          title: "Removed",
          description: "Product removed from your cart.",
          type: "success",
        });
      } else {
        await addToCart({ productId, quantity }).unwrap();
        toaster.create({
          title: "Success",
          description: "Product successfully added to your cart!",
          type: "success",
        });
      }
    } catch (error) {
      const err = error as BackendErrorResponse;
      const errorMessage = err?.data?.message || "Something went wrong. Please try again.";

      toaster.create({
        title: "Error updating cart",
        description: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <Box w="100%">
      {isInCart ? (
        <AppButton
          {...props}
          fontSize="18px"
          bg={isHovered ? "red.50" : "#FFF"}
          border={isHovered ? "2px solid #E53E3E" : "2px solid #7EB96A"}
          color={isHovered ? "#E53E3E" : "#1D1D1D"}
          fontWeight="600"
          onClick={handleCartAction}
          loading={isLoading}
          disabled={isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <>
              Remove <LuTrash2 size={18} />
            </>
          ) : (
            <>
              Added <Image src={AddedToCart} alt="Check Icon" />
            </>
          )}
        </AppButton>
      ) : (
        <AppButton fontSize="18px" {...props} onClick={handleCartAction} loading={isLoading} disabled={isLoading}>
          Add to Cart
          <LuPlus size={20} />
        </AppButton>
      )}
    </Box>
  );
};

export default AddToCartButton;
