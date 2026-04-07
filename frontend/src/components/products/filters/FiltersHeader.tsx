import { Heading, Image, Stack } from "@chakra-ui/react";
import smartSecurityImg from "../../../assets/headerCategoriesImages/smart-security.jpg";

const FiltersHeader = () => {
  return (
    <Stack gap="12px" p="20px" mb="20px">
      <Image src={smartSecurityImg} alt="Security Cameras" />
      <Heading
        fontWeight="600"
        textAlign="center"
        fontSize="20px"
        background="linear-gradient(104deg, #5FD8FF -7%, #9969FF 42.06%, #FF4B4B 91.11%)"
        backgroundClip="text"
        as="h1"
      >
        Security Cameras
      </Heading>
    </Stack>
  );
};

export default FiltersHeader;
