import { Box, Button, Group, Input, InputGroup } from "@chakra-ui/react";
import SearchIcon from "../../../assets/search.svg?react";
import s from "./Header.module.css";

const HeaderSearch = () => {
  return (
    <Box>
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
          />
        </InputGroup>
        <Box bg="#fff" borderRadius="0px 15px 15px 0px">
          <Button
            cursor="pointer"
            borderRadius="8px"
            bg="linear-gradient(92deg, #5FD8FF 0.39%, #9969FF 65.86%, #704FE5 102.04%)"
            color="#FFF"
            fontSize="14px"
            fontWeight="500"
            p="10px 19px"
            unstyled
            lineHeight="20px"
          >
            Search
          </Button>
        </Box>
      </Group>
    </Box>
  );
};

export default HeaderSearch;
