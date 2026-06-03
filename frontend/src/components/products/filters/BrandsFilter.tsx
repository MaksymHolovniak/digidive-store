import { Accordion, Checkbox, Flex, Span } from "@chakra-ui/react";
import AccordionItemIndicator from "./AccordionItemIndicator";

type BrandsFilterProps = {
  selectedValue: string;
  onChange: (value: string) => void;
};

const AVAILABLE_BRANDS = ["Xiaomi", "Roborock", "Samsung", "Wyze", "Dyson"];

const BrandsFilter = ({ selectedValue, onChange }: BrandsFilterProps) => {
  return (
    <Accordion.Item value="featured-brands">
      <Accordion.ItemTrigger p="18px 16px 18px 4px" fontWeight="600" cursor="pointer">
        <Span flex="1">Featured Brands</Span>
        <AccordionItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent p="0 4px 8px">
        <Flex flexDir="column" gap="4px">
          {AVAILABLE_BRANDS.map((brand) => (
            <Checkbox.Root
              key={brand}
              colorPalette="purple"
              checked={selectedValue === brand}
              onCheckedChange={(details) => {
                onChange(details.checked ? brand : "");
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label cursor='pointer'>{brand}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Flex>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default BrandsFilter;
