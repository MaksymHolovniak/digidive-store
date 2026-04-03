import { Box, Button, Flex, Image, Menu } from "@chakra-ui/react";
import s from "./Header.module.css";
import categories from "../../../data/categories.json";
import freeShippingBanner from "./../../../assets/free-shipping-banner.jpg";
import { useState } from "react";
import smartSecurityImg from "./../../../assets/headerCategoriesImages/smart-security.jpg";
import smartOfficeImg from "./../../../assets/headerCategoriesImages/smart-office.jpg";
import lightingImg from "./../../../assets/headerCategoriesImages/lighting-techology.jpg";
import audioVideoImg from "./../../../assets/headerCategoriesImages/audio-video.jpg";
import poolAutomationImg from "./../../../assets/headerCategoriesImages/pool-automation.jpg";
import homeDevicesImg from "./../../../assets/headerCategoriesImages/home-devices.jpg";
import homeSystemsImg from "./../../../assets/headerCategoriesImages/home-systems.jpg";
import buildingAutomationImg from "./../../../assets/headerCategoriesImages/building-automation.jpg";
import fireProtectionImg from "./../../../assets/headerCategoriesImages/fire-protection.jpg";

const imageMap = {
  "smart-security": smartSecurityImg,
  "smart-office": smartOfficeImg,
  "lighting-technology": lightingImg,
  "audio-video": audioVideoImg,
  "pool-automation": poolAutomationImg,
  "home-devices": homeDevicesImg,
  "home-systems": homeSystemsImg,
  "building-automation": buildingAutomationImg,
  "fire-protection": fireProtectionImg,
};

const HeaderProductsMenu = () => {
  const [isOpen, changeOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

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

  const selectedCategory = categories.find((c) => c.id === selectedItem);

  return (
    <Menu.Root open={isOpen}>
      <Button
        p="0"
        fontSize="16px"
        fontWeight="400"
        bg="#191D24"
        color="rgba(249, 249, 249, 1)"
        _hover={{
          color: "#9169F7",
          textDecoration: "underline",
        }}
        _active={{ bg: "#191D24" }}
        _focus={{ bg: "#191D24", boxShadow: "none" }}
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
                  value={category.title}
                  w="288px"
                  fontSize="16px"
                  p="8px 12px"
                  key={category.id}
                  _focus={{ bg: "#FFF" }}
                  _hover={{ bg: "#E4D9FD", borderRadius: "8px" }}
                  onMouseEnter={() => handleItemSelected(category.id)}
                >
                  {category.title}
                </Menu.Item>
              ))}
            </Box>
            {selectedCategory ? (
              <Flex
                gap="24px"
                direction="column"
                textAlign="center"
                p="20px"
                bg="#F8F9FA"
                borderRadius="16px"
                h="326px"
              >
                <Image
                  src={imageMap[selectedCategory.image as keyof typeof imageMap]}
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
                  {selectedCategory?.title}
                </Box>
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
