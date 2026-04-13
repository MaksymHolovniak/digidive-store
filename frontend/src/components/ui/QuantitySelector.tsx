import { Flex, IconButton, Text } from "@chakra-ui/react";
import { LuPlus, LuMinus } from "react-icons/lu";

type QuantitySelectorProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const QuantitySelector = ({ count, setCount }: QuantitySelectorProps) => {
  const handleDecrease = () => {
    setCount((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Flex align="center" gap="15px">
      <IconButton
        w="42px"
        h="42px"
        backgroundColor="#FFF"
        color="#000"
        borderColor="#1D1D1D"
        onClick={handleDecrease}
        disabled={count === 1}
      >
        <LuMinus />
      </IconButton>
      <Text fontSize="18px" fontWeight="500" w="25px" textAlign="center">
        {count}
      </Text>
      <IconButton
        w="42px"
        h="42px"
        backgroundColor="#FFF"
        color="#000"
        borderColor="#1D1D1D"
        onClick={handleIncrease}
      >
        <LuPlus />
      </IconButton>
    </Flex>
  );
};

export default QuantitySelector;
