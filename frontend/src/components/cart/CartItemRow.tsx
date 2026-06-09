import { Box, Button, Flex, Heading, Image, Table, Text } from "@chakra-ui/react";
import RemoveIcon from "../../assets/trash.svg?react";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { Link } from "react-router-dom";
import FavoriteButton from "../ui/FavoriteButton";
import type { CartItem } from "@/types/cart.types";
import { useRemoveFromCartMutation, useUpdateQuantityMutation } from "@/store/api/cart.api";
import { BASE_URL } from "@/constants/api.constants";
import { useGetProfileQuery, useToggleFavoriteMutation } from "@/store/api/user.api";
import type { BackendErrorResponse } from "@/types/auth.types";
import { toaster } from "../ui/toaster";

type CartItemRowProps = {
  item: CartItem;
};

const CartItemRow = ({ item }: CartItemRowProps) => {
  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const { data: profile } = useGetProfileQuery();
  const [toggleFavorite] = useToggleFavoriteMutation();

  const isFavorite = profile?.favorites.some((f) => f.product.id === item.productId) || false;

  const maxStock = item.product.stock;

  const handleQtyChange = async (newCount: number) => {
    if (newCount > maxStock) {
      toaster.create({
        title: "Limit reached",
        description: `Sorry, only ${maxStock} items available in stock.`,
        type: "warning",
      });
      return;
    }

    try {
      await updateQuantity({ productId: item.productId, quantity: newCount }).unwrap();
    } catch (error) {
      const err = error as BackendErrorResponse;
      toaster.create({
        title: "Error updating quantity",
        description: err?.data?.message || "Could not update product quantity.",
        type: "error",
      });
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.productId).unwrap();
      toaster.create({
        title: "Success",
        description: `${item.product.name} removed from cart.`,
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      const err = error as BackendErrorResponse;
      toaster.create({
        title: "Error removing item",
        description: err?.data?.message || "Could not remove product from cart.",
        type: "error",
      });
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(item.productId).unwrap();
    } catch (error) {
      const err = error as BackendErrorResponse;
      toaster.create({
        title: "Error updating favorites",
        description: err?.data?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const itemPriceTotal = Number((+item.product.price * item.quantity).toFixed(2));

  return (
    <Table.Row verticalAlign="top">
      <Table.Cell pt="20px">
        <Link to={`/product/${item.productId}`}>
          <Flex gap="30px" mb="8px" _hover={{ cursor: "pointer" }}>
            <Image
              src={`${BASE_URL}${item.product.imagePath}`}
              alt={item.product.name}
              w="170px"
              h="120px"
              objectFit="contain"
              _hover={{ cursor: "pointer" }}
            />
            <Box>
              <Heading as="h2" fontSize="18px" lineHeight="130%" mb="6px" maxW="500px">
                {item.product.name}
              </Heading>
              <Box color="#919191">
                <Text>Brand: {item.product.brand.name}</Text>
                <Text>Guarantee: {item.product.warrantyMonths} months</Text>
                {maxStock <= 5 && (
                  <Text color="orange.500" fontWeight="500" fontSize="14px" mt="4px">
                    Only {maxStock} left in stock!
                  </Text>
                )}
              </Box>
            </Box>
          </Flex>
        </Link>
        <Button onClick={handleRemove} bg="#FFF" color="#000">
          <Flex
            align="center"
            fontSize="16px"
            lineHeight="140%"
            gap="4px"
            _hover={{ color: "#9969FF" }}
            transition="color 0.3s"
          >
            <RemoveIcon style={{ width: "25px", height: "25px" }} />
            <Text>Remove</Text>
          </Flex>
        </Button>
        <Button onClick={handleToggleFavorite} bg="#FFF" color="#000">
          <Flex gap="8px" align="center" _hover={{ color: "#9969FF" }} transition="color 0.3s">
            <FavoriteButton isActive={isFavorite} />
            <Text>{isFavorite ? "In Favorites" : "Add to Favorites"}</Text>
          </Flex>
        </Button>
      </Table.Cell>
      <Table.Cell pt="20px">
        <Box w="140px">
          <QuantitySelector count={item.quantity} max={maxStock} onChange={handleQtyChange} />
        </Box>
      </Table.Cell>
      <Table.Cell textAlign="end" fontSize="20px" fontWeight="600" pt="30px">
        $ {itemPriceTotal}
      </Table.Cell>
    </Table.Row>
  );
};

export default CartItemRow;
