import { Heading, Image, Stack } from "@chakra-ui/react";

const FiltersHeader = () => {
  return (
    <Stack gap="12px" p="20px" mb="20px">
      <Image
        src={`http://localhost:4200/uploads/categories/1780496749552-386892379.jpg`}
        alt="Security Cameras"
      />
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
