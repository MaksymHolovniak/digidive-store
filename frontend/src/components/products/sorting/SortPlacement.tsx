import { Button, Flex } from "@chakra-ui/react";
import Grid2Columns from "../../../assets/grid-2-columns.svg?react";
import Grid3Columns from "../../../assets/grid-3-columns.svg?react";
import { useState } from "react";

const SortPlacement = () => {
  const [view, setView] = useState<"grid-2" | "grid-3">("grid-2");

  const options = [
    { value: "grid-2", icon: Grid2Columns },
    { value: "grid-3", icon: Grid3Columns },
  ] as const;

  return (
    <Flex alignItems="center" gap="8px">
      {options.map(({ value, icon: Icon }) => (
        <Button
          key={value}
          onClick={() => setView(value)}
          w="34px"
          minW="34px"
          h="34px"
          p={0}
          borderRadius="8px"
          bg={view === value ? "#1D1D1D" : "#F3F4F5"}
          transition="background-color 0.3s"
        >
          <Icon style={{ color: view === value ? "#fff" : "#000" }} />
        </Button>
      ))}
    </Flex>
  );
};

export default SortPlacement;
