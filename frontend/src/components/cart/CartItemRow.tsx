import { Box, Button, Flex, Heading, Image, Table, Text } from "@chakra-ui/react";
import testProductItem from "../../assets/test-product-item.jpg";
import RemoveIcon from "../../assets/trash.svg?react";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../ui/FavoriteButton";

const CartItemRow = () => {
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Table.Row verticalAlign="top">
      <Table.Cell pt="20px">
        <Link to={`/products/1`}>
          <Flex gap="30px" mb="8px" _hover={{ cursor: "pointer" }}>
            <Image
              src={testProductItem}
              alt="Smart Automatic Curtain Opener - Remote Control "
              w="170px"
            />
            <Box>
              <Heading as="h2" fontSize="18px" lineHeight="130%" mb="6px">
                Smart Automatic Curtain Opener - Remote Control
              </Heading>
              <Box color="#919191">
                <Text>Color: white</Text>
                <Text>Brand: SwitchBot</Text>
                <Text>Guarantee: 24 months</Text>
              </Box>
            </Box>
          </Flex>
        </Link>
        <Button bg="#FFF" color="#000">
          <Flex align="center" fontSize="16px" lineHeight="140%" gap="4px">
            <RemoveIcon style={{ width: "25px", height: "25px" }} /> Remove
          </Flex>
        </Button>
        <Button onClick={handleToggleFavorite} bg="#FFF" color="#000">
          <Flex gap="8px" align="center" _hover={{ color: "#9969FF" }} transition="color 0.3s">
            <FavoriteButton isActive={isFavorite} />
            <Text>Add to Favorites</Text>
          </Flex>
        </Button>
      </Table.Cell>
      <Table.Cell pt="20px">
        <Box w="140px">
          <QuantitySelector count={count} setCount={setCount} />
        </Box>
      </Table.Cell>
      <Table.Cell textAlign="end" fontSize="20px" fontWeight="600" pt="30px">
        $ 127.98
      </Table.Cell>
    </Table.Row>
  );
};

export default CartItemRow;
