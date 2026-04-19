import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import testProductItem from "../../assets/test-product-item.jpg";
import AddToCartButton from "@/components/product/product-card/AddToCartButton";
import { useState } from "react";
import QuantitySelector from "../ui/QuantitySelector";
import FavoriteButton from "../ui/FavoriteButton";

const ProductInfoSection = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(1);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Flex justify="center" gap="50px" mb="100px" as="section">
      <Image src={testProductItem} alt="Wyze Cam v3" w="500px" />
      <Flex gap="30px" direction="column" pt="20px">
        <Heading as="h1" fontSize="26px" lineHeight="110%" maxW="500px">
          Wyze Cam Pan v3, 180° tilt security camera, fully IP65 weather resistant
        </Heading>
        <Text fontSize="28px">$ 127.00</Text>
        <Text maxW="600px">
          The Wyze Cam Pan v3 is an IP65-rated, weatherproof, 1080p indoor/outdoor security camera
          featuring horizontal panning and vertical tilting. It automatically tracks motion, offers
          color night vision up to 25x darker environments, and boasts silent motor operation. It
          supports local microSD storage (up to 512GB) and features two-way audio.
        </Text>
        <QuantitySelector count={count} setCount={setCount} />
        <AddToCartButton w="250px" h="52px" />
        <Flex
          as='button'
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
