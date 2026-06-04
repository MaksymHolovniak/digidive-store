import { Box, Group, Input, InputGroup } from "@chakra-ui/react";
import SearchIcon from "../../../assets/search.svg?react";
import s from "./Header.module.css";
import AppButton from "@/components/ui/AppButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);

    setSearchValue("");
  };

  return (
    <Box as="form" onSubmit={handleSearch}>
      <Group attached w="full" className={s.inputGroup}>
        <InputGroup startElement={<SearchIcon className={s.searchIcon} />}>
          <Input
            fontSize="16px"
            placeholder="Search"
            bg="#fff"
            borderRadius="8px 0px 0px 8px"
            color="#3A3F49"
            w="216px"
            h="40px"
            css={{
              "--focus-color": "transparent",
            }}
            borderColor="transparent"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
        <Box bg="#fff" borderRadius="0px 15px 15px 0px">
          <AppButton fontSize="14px" fontWeight="500" p="10px 19px" lineHeight="20px" type="submit">
            Search
          </AppButton>
        </Box>
      </Group>
    </Box>
  );
};

export default HeaderSearch;
