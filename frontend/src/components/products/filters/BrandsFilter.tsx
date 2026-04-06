import { Accordion, Box, Checkbox, Flex, Span, useAccordionItemContext } from "@chakra-ui/react";
import { LuPlus, LuMinus } from "react-icons/lu";

const BrandsFilter = () => {
  return (
    <Accordion.Item value="featured-brands">
      <Accordion.ItemTrigger p="18px 16px 18px 4px" fontWeight="600">
        <Span flex="1">Featured Brands</Span>
        <AccordionItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent p="0 4px 8px">
        <Flex flexDir="column" gap="4px">
          {Array.from({ length: 9 }).map((_, i) => (
            <Checkbox.Root key={i} colorPalette="purple">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Flex>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

const AccordionItemIndicator = () => {
  const { expanded } = useAccordionItemContext();
  return <Box>{expanded ? <LuMinus /> : <LuPlus />}</Box>;
};

export default BrandsFilter;
