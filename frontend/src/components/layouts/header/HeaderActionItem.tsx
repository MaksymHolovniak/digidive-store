import { Box, Flex } from "@chakra-ui/react";
import type { ElementType, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type HeaderActionItemProps = {
  icon: ElementType;
  label: string;
  to: string;
  children?: ReactNode;
};

const HeaderActionItem = ({ icon: Icon, label, to, children }: HeaderActionItemProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      direction="column"
      position="relative"
      textAlign="center"
      marginTop="auto"
      paddingBottom="6px"
      as="button"
      cursor="pointer"
      _hover={{ color: "#9969FF" }}
      transition="color 0.3s"
      onClick={() => navigate(to)}
    >
      <Icon width="24px" height="24px" />
      <Box h="18px">{label}</Box>
      {children}
    </Flex>
  );
};

export default HeaderActionItem;
