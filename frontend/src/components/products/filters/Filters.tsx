import AppButton from "@/components/ui/AppButton";
import { AccordionRoot, Button, Flex } from "@chakra-ui/react";
import BrandsFilter from "./BrandsFilter";
import SearchFilter from "./SearchFilter";
import PriceFilter from "./PriceFilter";
import FiltersHeader from "./FiltersHeader";
import type { Brand, FilterState } from "@/types/product.types";
import { useState } from "react";
import type { Category } from "@/types/category.types";

type FilterProps = {
  currentCategory: Category | null;
  brands: Brand[]
  activeFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
};

const Filters = ({ currentCategory, brands, activeFilters, onApplyFilters }: FilterProps) => {
  const [tempFilters, setTempFilters] = useState<FilterState>(activeFilters);

  const [prevActiveFilters, setPrevActiveFilters] = useState<FilterState>(activeFilters);

  if (activeFilters !== prevActiveFilters) {
    setPrevActiveFilters(activeFilters);
    setTempFilters(activeFilters);
  }

  const handleInputChange = (field: keyof FilterState, value: string) => {
    setTempFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearAll = () => {
    const cleared = { searchTerm: "", brand: "", minPrice: "", maxPrice: "" };
    setTempFilters(cleared);
    onApplyFilters(cleared);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onApplyFilters(tempFilters);
  };

  return (
    <Flex w="100%" maxW="254px" direction="column" as="form" onSubmit={handleSubmit}>
      <FiltersHeader currentCategory={currentCategory} />
      <Button
        color="#9169F7"
        alignSelf="flex-end"
        fontSize="16px"
        bg="#FFF"
        p="0"
        type="button"
        onClick={handleClearAll}
      >
        Clear All
      </Button>
      <AccordionRoot
        multiple
        mb="28px"
        defaultValue={["search-keyword", "featured-brands", "price"]}
      >
        <SearchFilter
          value={tempFilters.searchTerm}
          onChange={(val) => handleInputChange("searchTerm", val)}
        />
        <BrandsFilter
          brands={brands}
          selectedValue={tempFilters.brand}
          onChange={(val) => handleInputChange("brand", val)}
        />
        <PriceFilter
          minPrice={tempFilters.minPrice}
          maxPrice={tempFilters.maxPrice}
          onMinChange={(val) => handleInputChange("minPrice", val)}
          onMaxChange={(val) => handleInputChange("maxPrice", val)}
        />
      </AccordionRoot>

      <AppButton
        w="100%"
        _hover={{
          top: "2px",
        }}
        fontSize="16px"
        fontWeight="600"
        type="submit"
      >
        Apply changes
      </AppButton>
    </Flex>
  );
};

export default Filters;
