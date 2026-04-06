import { Accordion, Input, Span } from "@chakra-ui/react";
import AccordionItemIndicator from "./AccordionItemIndicator";

const SearchFilter = () => {
  return (
    <Accordion.Item value="search-keyword">
      <Accordion.ItemTrigger p="18px 16px 18px 4px" fontWeight="600" cursor="pointer">
        <Span flex="1">Find with key word</Span>
        <AccordionItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent p="0 4px 8px">
        <Input
          css={{ "--focus-color": "#7449df" }}
          type="search"
          borderRadius="8px"
          w="100%"
          maxW="238px"
          fontSize="16px"
        />
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default SearchFilter;
