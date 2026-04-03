import { Flex, Heading, Text } from "@chakra-ui/react";

const items = [
  "Smart home security solutions",
  "Smart office solution",
  "Lighting and lighting technology",
  "Audio - Video",
  "Smart pool automation",
  "Smart home devices",
  "Smart home systems",
  "Building automation system",
  "Fire protection systems",
];

const FooterProducts = () => {
  return (
    <Flex gap="16px" direction="column" w="288px">
      <Heading as="h3" fontSize="18px" fontWeight="600" textTransform="uppercase">
        Smart Home Products
      </Heading>
      <Flex color="#D1D1D1" fontWeight="400" fontSize="16px" direction="column" gap="12px">
        {items.map((item) => (
          <Text
            key={item}
            cursor="pointer"
            _hover={{
              color: "#9169F7",
              textDecoration: "underline",
            }}
          >
            {item}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default FooterProducts;
