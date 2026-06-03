import { Accordion, Flex, Input, Span } from "@chakra-ui/react";
import AccordionItemIndicator from "./AccordionItemIndicator";

type PriceFilterProps = {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
};

const PriceFilter = ({ minPrice, maxPrice, onMinChange, onMaxChange }: PriceFilterProps) => {
  return (
    <Accordion.Item value="price">
      <Accordion.ItemTrigger p="18px 16px 18px 4px" fontWeight="600" cursor="pointer">
        <Span flex="1">Price</Span>
        <AccordionItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent p="0 4px 8px">
        <Flex gap="8px">
          <Input
            css={{ "--focus-color": "#7449df" }}
            type="number"
            borderRadius="8px"
            w="100%"
            maxW="120px"
            fontSize="16px"
            placeholder="From"
            value={minPrice}
            onChange={(e) => onMinChange(e.target.value)}
          />
          <Input
            css={{ "--focus-color": "#7449df" }}
            type="number"
            borderRadius="8px"
            w="100%"
            maxW="120px"
            fontSize="16px"
            placeholder="To"
            value={maxPrice}
            onChange={(e) => onMaxChange(e.target.value)}
          />
        </Flex>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default PriceFilter;
