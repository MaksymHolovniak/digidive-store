import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import testProductItem from "../../../assets/test-product-item.jpg";
import AddToCartButton from "./AddToCartButton";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "@/components/ui/FavoriteButton";
import type { Product } from "@/types/product.types";
import { BASE_URL } from "@/constants/api.constants";
import { useGetProfileQuery, useToggleFavoriteMutation } from "@/store/api/user.api";
import type { BackendErrorResponse } from "@/types/auth.types";
import { toaster } from "@/components/ui/toaster";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery();
  const [toggleFavorite] = useToggleFavoriteMutation();

  const isFavorite = profile?.favorites.some((f) => f.product.id === product.id) || false;

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      await toggleFavorite(product.id).unwrap;
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
    <Flex
      direction="column"
      align="center"
      w="100%"
      maxW="230px"
      pb="24px"
      gap="24px"
      transition="0.3s"
      onClick={handleNavigate}
      _hover={{
        transform: "translateY(-4px)",
        cursor: "pointer",
      }}
    >
      <Box w="100%" maxW="200px" h="202px" overflow="hidden">
        <Image
          w="100%"
          h="100%"
          objectFit="contain"
          src={product.imagePath ? `${BASE_URL}${product.imagePath}` : testProductItem}
          alt={product.name}
        />
      </Box>
      <Heading as="h3" fontSize="16px" fontWeight="300" lineHeight="110%">
        {product.brand.name}
      </Heading>
      <Flex gap="8px" direction="column">
        <Text
          px="15px"
          color="#464646"
          fontSize="16px"
          fontWeight="600"
          lineHeight="130%"
          letterSpacing="-0.48px"
          textAlign="center"
        >
          {product.name}
        </Text>
        <Flex fontSize="18px" align="center" justify="center" gap="8px" color="#464646">
          <Text fontSize="18px" color="#464646">
            ${product.price}
          </Text>
        </Flex>
        <Flex onClick={(e) => e.stopPropagation()} align="center" gap="24px">
          <AddToCartButton productId={product.id} w="100%" />
          <Box as="button" _hover={{ color: "#9969FF" }} transition="color 0.3s" onClick={handleFavoriteClick}>
            <FavoriteButton isActive={isFavorite} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
