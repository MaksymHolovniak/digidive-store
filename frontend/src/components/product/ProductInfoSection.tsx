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

type ProductInfoSectionProps = {
  product: CurrentProduct;
};

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const { data: profile } = useGetProfileQuery();
  const { data: cartData } = useGetCartQuery();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [updateQuantity] = useUpdateQuantityMutation();

  const cartItem = cartData?.items.find((item) => item.productId === product.id);
  const isInCart = !!cartItem;

  const [localCount, setLocalCount] = useState(1);

  const count = isInCart && cartItem ? cartItem.quantity : localCount;

  const isFavorite = profile?.favorites.some((f) => f.product.id === product.id) || false;

  const handleQuantityChange = async (newCount: number) => {
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
    <Flex justify="center" gap="50px" mt="40px" mb="100px" as="section">
      <Image src={`${BASE_URL}${product.imagePath}`} alt={product.name} />
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
        <QuantitySelector count={count} onChange={handleQuantityChange} />
        <AddToCartButton productId={product.id} quantity={count} w="250px" h="52px" />
        <Flex
          as="button"
          gap="8px"
          align="center"
          onClick={handleToggleFavorite}
          _hover={{ color: "#9969FF" }}
          transition="color 0.3s"
        >
          <FavoriteButton isActive={isFavorite} />
          <Text>Add to Favorites</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInfoSection;
