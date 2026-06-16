import { Flex, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type AdminSidebarItemProps = {
  name: string;
  path: string;
  icon: IconType;
};

const AdminSidebarItem = ({ name, path, icon: Icon }: AdminSidebarItemProps) => {
  return (
    <NavLink to={path} end style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Flex
          align="center"
          gap="12px"
          p="12px 16px"
          borderRadius="10px"
          bg={isActive ? "#9969FF" : "transparent"}
          color={isActive ? "white" : "gray.300"}
          _hover={{
            bg: isActive ? "#9969FF" : "#242A35",
            color: "white",
          }}
          transition="all 0.2s"
          fontWeight="500"
        >
          <Icon size={18} />
          <Text>{name}</Text>
        </Flex>
      )}
    </NavLink>
  );
};

export default AdminSidebarItem;
