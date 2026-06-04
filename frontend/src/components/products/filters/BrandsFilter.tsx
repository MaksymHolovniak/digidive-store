import { Accordion, Checkbox, Flex, Span } from "@chakra-ui/react";
import AccordionItemIndicator from "./AccordionItemIndicator";
import type { Brand } from "@/types/product.types";

type BrandsFilterProps = {
  brands: Brand[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const BrandsFilter = ({ brands, selectedValue, onChange }: BrandsFilterProps) => {
  return (
    <Accordion.Item value="featured-brands">
      <Accordion.ItemTrigger p="18px 16px 18px 4px" fontWeight="600" cursor="pointer">
        <Span flex="1">Featured Brands</Span>
        <AccordionItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent p="0 4px 8px">
        <Flex flexDir="column" gap="4px">
          {brands.map((brand) => (
            <Checkbox.Root
              key={brand.id}
              colorPalette="purple"
              checked={selectedValue === brand.name}
              onCheckedChange={(details) => {
                onChange(details.checked ? brand.name : "");
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label cursor="pointer">{brand.name}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Flex>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default BrandsFilter;
