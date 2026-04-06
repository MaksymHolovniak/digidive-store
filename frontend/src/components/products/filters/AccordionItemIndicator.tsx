import { Box, useAccordionItemContext } from "@chakra-ui/react";
import { LuPlus, LuMinus } from "react-icons/lu";

const AccordionItemIndicator = () => {
  const { expanded } = useAccordionItemContext();
  return <Box>{expanded ? <LuMinus size={24} /> : <LuPlus size={24} />}</Box>;
};

export default AccordionItemIndicator

