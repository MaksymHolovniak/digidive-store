import { Flex, IconButton, Text } from "@chakra-ui/react";
import { LuPlus, LuMinus } from "react-icons/lu";

type QuantitySelectorProps = {
  count: number;
  max?: number;
  onChange: (newCount: number) => void;
};

const QuantitySelector = ({ count, onChange, max }: QuantitySelectorProps) => {
 const handleDecrease = () => {
   if (count > 1) {
     onChange(count - 1);
   }
 };

  const handleIncrease = () => {
   if (max !== undefined && count >= max) return;
   onChange(count + 1);
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
        disabled={max !== undefined && count >= max}
      >
        <LuPlus />
      </IconButton>
    </Flex>
  );
};

export default QuantitySelector;
