import { Box, Button, Flex, Image, Menu } from "@chakra-ui/react";
import s from "./Header.module.css";
import freeShippingBanner from "./../../../assets/free-shipping-banner.jpg";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/store/api/category.api";
import { useNavigate } from "react-router-dom";

const HeaderProductsMenu = () => {
  const navigate = useNavigate();
  const [isOpen, changeOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const { data: categories = [] } = useGetCategoriesQuery();
  const BASE_URL = "http://localhost:4200";

  const handleOpen = () => {
    changeOpen(true);
  };

  const handleClose = () => {
    changeOpen(false);
    setSelectedItem(null);
  };

  const handleItemSelected = (itemName: number) => {
    setSelectedItem(itemName);
  };

  const handleNavigation = (id: number) => {
    navigate(`/products/${id}`);
    handleClose();
  };

  const selectedCategory = categories.find((c) => c.id === selectedItem);

  return (
    <Menu.Root open={isOpen}>
      <Button
        p="0"
        fontSize="18px"
        fontWeight="400"
        bg="#191D24"
        color="rgba(249, 249, 249, 1)"
        _hover={{
          color: "#9169F7",
          textDecoration: "underline",
        }}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        gap="0px"
      >
        Smart Home Products
      </Button>
      <Box
        className={`${s.dropdown} ${isOpen ? s.open : ""}`}
        onMouseLeave={handleClose}
        onMouseEnter={handleOpen}
        position="absolute"
        top="62px"
        maxW="1370px"
        w="100%"
        transform="translateX(-50%)"
        left="50%"
        borderRadius="0px 0px 16px 16px"
        color="#000"
        bg="transparent"
      >
        <Box
          mt={"14px"}
          padding="23px 71px 37px 34px"
          borderRadius="0px 0px 16px 16px"
          color="#000"
          bg="#fff"
        >
          <Flex gap="32px">
            <Box>
              {categories.map((category) => (
                <Menu.Item
                  value={category.name}
                  w="288px"
                  fontSize="16px"
                  p="8px 12px"
                  key={category.id}
                  _focus={{ bg: "#FFF" }}
                  _hover={{ bg: "#E4D9FD", borderRadius: "8px" }}
                  cursor='pointer'
                  onMouseEnter={() => handleItemSelected(category.id)}
                  onClick={() => handleNavigation(category.id)}
                >
                  {category.name}
                </Menu.Item>
              ))}
            </Box>
            {selectedCategory ? (
              <Flex gap="48px" w="100%">
                <Flex
                  gap="24px"
                  direction="column"
                  textAlign="center"
                  p="20px"
                  h="326px"
                  bg="#F8F9FA"
                  borderRadius="16px"
                  cursor="pointer"
                  onClick={() => handleNavigation(selectedCategory.id)}
                >
                  <Image
                    src={
                      selectedCategory.imagePath
                        ? `${BASE_URL}${selectedCategory.imagePath}`
                        : freeShippingBanner
                    }
                    w="200px"
                    h="202px"
                    alt="categoryImage"
                  />
                  <Box
                    fontSize="20px"
                    fontWeight="600"
                    background="linear-gradient(104deg, #5FD8FF -7%, #9969FF 42.06%, #FF4B4B 91.11%)"
                    backgroundClip="text"
                    maxW="200px"
                    as={"p"}
                    letterSpacing="-0.6px"
                  >
                    {selectedCategory?.name}
                  </Box>
                </Flex>
                <Flex
                  direction="column"
                  flexWrap="wrap"
                  maxH="280px"
                  columnGap="40px"
                  rowGap="8px"
                  align="flex-start"
                  pt="24px"
                >
                  {selectedCategory.children?.map((subCategory) => (
                    <Box
                      key={subCategory.id}
                      maxW="350px"
                      fontSize="16px"
                      color="#1D1D1D"
                      _hover={{
                        color: "#9169F7",
                        textDecoration: "underline",
                      }}
                      cursor="pointer"
                      onClick={() => handleNavigation(subCategory.id)}
                    >
                      {subCategory.name}
                    </Box>
                  ))}
                </Flex>
              </Flex>
            ) : (
              <Image
                paddingTop="12px"
                h="306px"
                src={freeShippingBanner}
                alt="Free shipping over $150"
              />
            )}
          </Flex>
        </Box>
      </Box>
    </Menu.Root>
  );
};

export default HeaderProductsMenu;
