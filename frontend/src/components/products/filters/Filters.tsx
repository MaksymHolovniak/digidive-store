import AppButton from "@/components/ui/AppButton";
import { AccordionRoot, Button, Flex } from "@chakra-ui/react";
import BrandsFilter from "./BrandsFilter";

const Filters = () => {
  return (
    <Flex w="100%" maxW="254px" direction="column">
      <Button color="#9169F7" alignSelf="flex-end" fontSize="16px" bg="#FFF" p="0">
        Clear All
      </Button>
      <AccordionRoot multiple defaultValue={[]} mb="28px">
        <BrandsFilter />
      </AccordionRoot>

      <AppButton
        w="100%"
        _hover={{
          top: "2px",
        }}
        fontSize="16px"
        fontWeight="600"
      >
        Apply changes
      </AppButton>
    </Flex>
  );
};

export default Filters;
