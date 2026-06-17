import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import AddToCartButton from "@/components/product/product-card/AddToCartButton";
import { useState } from "react";
import QuantitySelector from "../ui/QuantitySelector";
import FavoriteButton from "../ui/FavoriteButton";
import type { CurrentProduct } from "@/types/product.types";
import { BASE_URL } from "@/constants/api.constants";
import DeliveryIcon from "../../assets/delivery.svg";
import ClockIcon from "../../assets/clock.svg";
import GuaranteeIcon from "../../assets/guarantee.svg";
import { useGetProfileQuery, useToggleFavoriteMutation } from "@/store/api/user.api";
import { useGetCartQuery, useUpdateQuantityMutation } from "@/store/api/cart.api";
import type { BackendErrorResponse } from "@/types/auth.types";
import { toaster } from "../ui/toaster";
import AppButton from "../ui/AppButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

type ProductInfoSectionProps = {
  product: CurrentProduct;
};

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuth });
  const { data: cartData } = useGetCartQuery(undefined, { skip: !isAuth });
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [updateQuantity] = useUpdateQuantityMutation();

  const cartItem = cartData?.items.find((item) => item.productId === product.id);
  const isInCart = !!cartItem;

  const [localCount, setLocalCount] = useState(1);

  const count = isInCart && cartItem ? cartItem.quantity : localCount;

  const isFavorite = profile?.favorites.some((f) => f.product.id === product.id) || false;

  const isOutOfStock = product.stock === 0;

  const handleQuantityChange = async (newCount: number) => {
    if (isOutOfStock) return;

    if (!isAuth) {
      setLocalCount(newCount);
      return;
    }

    if (newCount > product.stock) {
      toaster.create({
        title: "Limit reached",
        description: `Sorry, only ${product.stock} items available in stock.`,
        type: "warning",
      });
      return;
    }

    if (isInCart) {
      try {
        await updateQuantity({ productId: product.id, quantity: newCount }).unwrap();
      } catch (error) {
        const err = error as BackendErrorResponse;
        toaster.create({
          title: "Error updating quantity",
          description: err?.data?.message || "Could not sync quantity with server.",
          type: "error",
        });
      }
    } else {
      setLocalCount(newCount);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuth) {
      toaster.create({
        title: "Authorization required",
        description: "Please sign in to add products to your favorites",
        type: "warning",
      });
      navigate("/sign-in");
      return;
    }

    try {
      await toggleFavorite(product.id).unwrap();
    } catch (error) {
      const err = error as BackendErrorResponse;
      toaster.create({
        title: "Error updating favorites",
        description: err?.data?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <Flex justify="center" gap="150px" mt="40px" mb="100px" as="section">
      <Image
        src={`${BASE_URL}${product.imagePath}`}
        alt={product.name}
        maxW="500px"
        objectFit="contain"
        opacity={isOutOfStock ? 0.6 : 1}
        transition="opacity 0.3s"
      />
      <Flex gap="30px" direction="column" pt="20px">
        <Heading as="h1" fontSize="26px" lineHeight="110%" maxW="500px">
          {product.name}
        </Heading>
        <Text fontSize="28px">$ {product.price}</Text>
        <Text maxW="600px">{product.description}</Text>
        <Box>
          <Flex align="center" gap="16px" mb="8px">
            <Flex align="center" gap="8px">
              <Image src={DeliveryIcon} alt="Delivery Icon" />
              <Text>Free Delivery for order over $150.00 </Text>
            </Flex>
            <Flex align="center" gap="8px">
              <Image src={ClockIcon} alt="Clock icon" />
              <Text>2-3 working days</Text>
            </Flex>
          </Flex>
          <Flex align="center" gap="8px">
            <Image src={GuaranteeIcon} alt="Money protection icon" />
            <Text>Guarantee {product.warrantyMonths} months</Text>
          </Flex>
        </Box>
        {isOutOfStock ? (
          <Flex direction="column" gap="15px">
            <Box opacity={0.5} pointerEvents="none">
              <QuantitySelector count={0} onChange={() => {}} />
            </Box>
            <AppButton
              w="250px"
              h="52px"
              fontSize="18px"
              bg="#F5F5F5"
              color="#919191"
              border="1px solid #D9D9D9"
              disabled
              _hover={{ bg: "#F5F5F5" }}
            >
              Out of Stock
            </AppButton>
          </Flex>
        ) : (
          <>
            <QuantitySelector count={count} max={product.stock} onChange={handleQuantityChange} />
            <AddToCartButton productId={product.id} quantity={count} w="250px" h="52px" />
          </>
        )}

        <Flex
          as="button"
          gap="8px"
          align="center"
          onClick={handleToggleFavorite}
          _hover={{ color: "#9969FF" }}
          transition="color 0.3s"
        >
          <FavoriteButton isActive={isFavorite} />
          <Text>{isFavorite ? "In Favorites" : "Add to Favorites"}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInfoSection;
