import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <Flex minH="100vh" bg="#F9FAFB">
      <AdminSidebar />
      <Box ml="260px" w="full" p="40px 60px">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminLayout;
