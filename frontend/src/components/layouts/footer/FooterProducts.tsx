import { useGetCategoriesQuery } from "@/store/api/category.api";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FooterProducts = () => {
  const navigate = useNavigate();

  const { data: categories = [] } = useGetCategoriesQuery();

  const handleNavigate = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <Flex gap="16px" direction="column" w="288px">
      <Heading
        as="h3"
        fontSize="18px"
        fontWeight="600"
        textTransform="uppercase"
      >
        Smart Home Products
      </Heading>
      <Flex
        color="#D1D1D1"
        fontWeight="400"
        fontSize="16px"
        direction="column"
        gap="12px"
      >
        {categories.map((category) => (
          <Text
            key={category.id}
            cursor="pointer"
            _hover={{
              color: "#9169F7",
              textDecoration: "underline",
            }}
            onClick={() => handleNavigate(category.id)}
          >
            {category.name}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default FooterProducts;
