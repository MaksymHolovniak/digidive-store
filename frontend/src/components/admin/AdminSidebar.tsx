import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { LuArrowLeft, LuBox, LuFolder, LuLayoutDashboard, LuShoppingCart, LuTags } from "react-icons/lu";
import { Link } from "react-router-dom";
import AdminSidebarItem from "./AdminSidebarItem";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LuLayoutDashboard },
  { name: "Brands", path: "/admin/brands", icon: LuTags },
  { name: "Categories", path: "/admin/categories", icon: LuFolder },
  { name: "Products", path: "/admin/products", icon: LuBox },
  { name: "Orders", path: "/admin/orders", icon: LuShoppingCart },
];

const AdminSidebar = () => {
  return (
    <Box w="260px" bg="#191D24" color="white" p="30px 20px" position="fixed" h="100vh" left="0" top="0" zIndex="10">
      <Stack gap="32px" h="full">
        <Box>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <Text fontSize="22px" fontWeight="700" color="#9969FF" mb="4px">
              DigiDive Admin
            </Text>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Flex
              align="center"
              gap="8px"
              color="gray.400"
              fontSize="13px"
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              <LuArrowLeft size={14} /> Back to Store
            </Flex>
          </Link>
        </Box>
        <Stack gap="8px" flex="1">
          {menuItems.map((item) => (
            <AdminSidebarItem key={item.path} name={item.name} path={item.path} icon={item.icon} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
