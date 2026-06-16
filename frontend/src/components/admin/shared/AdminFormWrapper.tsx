import { Box, Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";

type AdminFormWrapperProps = {
  title: string;
  children: ReactNode;
};

const AdminFormWrapper = ({ title, children }: AdminFormWrapperProps) => {
  return (
    <Box
      bg="white"
      p="30px"
      borderRadius="16px"
      border="1px solid #E2E8F0"
      w={{ base: "100%", lg: "360px" }}
      boxShadow="0 2px 12px rgba(0,0,0,0.01)"
    >
      <Heading size="md" mb="20px" color="#464646">
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default AdminFormWrapper;
