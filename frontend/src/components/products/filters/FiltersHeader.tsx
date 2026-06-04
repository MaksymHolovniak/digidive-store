import { BASE_URL } from "@/constants/api.constants";
import type { Category } from "@/types/category.types";
import { Box, Heading, Image, Stack } from "@chakra-ui/react";

type FiltersHeaderProps = {
  currentCategory: Category | null;
};

const FiltersHeader = ({ currentCategory }: FiltersHeaderProps) => {

  if (!currentCategory) {
    return (
      <Box p="12px" mb="20px">
        <Heading
          fontWeight="600"
          textAlign="center"
          fontSize="20px"
          background="linear-gradient(104deg, #5FD8FF -7%, #9969FF 42.06%, #FF4B4B 91.11%)"
          backgroundClip="text"
          color="transparent"
          as="h1"
        >
          Search Results
        </Heading>
      </Box>
    );
  }

  return (
    <Stack gap="12px" p="20px" mb="20px">
      <Image src={`${BASE_URL}${currentCategory?.imagePath}`} alt={currentCategory?.name} />
      <Heading
        fontWeight="600"
        textAlign="center"
        fontSize="20px"
        background="linear-gradient(104deg, #5FD8FF -7%, #9969FF 42.06%, #FF4B4B 91.11%)"
        backgroundClip="text"
        color="transparent"
        as="h1"
      >
        {currentCategory?.name}
      </Heading>
    </Stack>
  );
};

export default FiltersHeader;
