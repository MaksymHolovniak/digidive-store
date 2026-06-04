import { Box, createListCollection, Flex, Select } from "@chakra-ui/react";
import ChevronDown from "../../../assets/chevron-down.svg?react";
import ChevronUp from "../../../assets/chevron-up.svg?react";
import type { SortValue } from "@/types/product.types";


type SortOption = {
  label: string;
  value: SortValue;
};

type ProductsSortSelectProps = {
  value: SortValue;
  onChange: (value: SortValue) => void
}

const options = createListCollection<SortOption>({
  items: [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "cheaper" },
    { label: "Price: High to Low", value: "expensive" },
    { label: "Alphabetical", value: "alphabetical" },
  ],
});

const ProductsSortSelect = ({value, onChange}: ProductsSortSelectProps) => {
  return (
    <Flex gap="16px" align="center">
      <Box color="#464646">Sort</Box>
      <Select.Root
        collection={options}
        value={[value]}
        onValueChange={(details) => {
          if (details.value?.[0]) {
            onChange(details.value[0] as SortValue);
          }
        }}
        width="240px"
      >
        <Select.Trigger
          h="37px"
          borderColor={"#515151"}
          borderRadius="8px"
          color="#464646"
          fontSize="16px"
          px="18px"
          cursor="pointer"
        >
          <Select.ValueText />
          <Box
            as="span"
            css={{
              "& svg": { width: "24px", height: "24px" },
              "[data-state=open] & .chevron-down": { display: "none" },
              "[data-state=closed] & .chevron-up": { display: "none" },
            }}
          >
            <ChevronDown className="chevron-down" />
            <ChevronUp className="chevron-up" />
          </Box>
        </Select.Trigger>
        <Select.Positioner>
          <Select.Content borderRadius="8px" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.15)" p="0">
            {options.items.map((item) => (
              <Select.Item
                item={item}
                key={item.value}
                p="8px 18px 8px 21px"
                borderRadius="8px"
                cursor="pointer"
                _hover={{ bg: "#E4D9FD", color: "#1D1D1D" }}
                _selected={{ bg: "#E4D9FD", color: "#1D1D1D" }}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Flex>
  );
};

export default ProductsSortSelect;
