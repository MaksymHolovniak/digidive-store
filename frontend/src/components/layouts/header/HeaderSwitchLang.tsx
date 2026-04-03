import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

const HeaderSwitchLang = () => {
  const [lang, setLang] = useState<"EN" | "UA">("EN");

  return (
    <Flex align="center" color="rgba(249, 249, 249, 0.3)">
      <Box
        as="button"
        onClick={() => setLang("EN")}
        color={lang === "EN" ? "#FFF" : "inherit"}
        px="1"
        cursor="pointer"
        transition="color 0.2s"
      >
        EN
      </Box>

      <Box w="2px" h="14px" bg="rgba(249, 249, 249, 0.3)" mx="2" />

      <Box
        as="button"
        onClick={() => setLang("UA")}
        color={lang === "UA" ? "#FFF" : "inherit"}
        transition="color 0.2s"
        px="1"
        cursor="pointer"
      >
        UA
      </Box>
    </Flex>
  );
};

export default HeaderSwitchLang;
