import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

type AppContainerProps = {
  children: ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <Box mx="auto" maxWidth="1552px" px="24px" w="100%">
      {children}
    </Box>
  );
};

export default AppContainer;
