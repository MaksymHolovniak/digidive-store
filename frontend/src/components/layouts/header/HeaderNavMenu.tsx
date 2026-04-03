import { Flex, Menu } from "@chakra-ui/react";
import NavButton from "./NavButton";
import HeaderProductsMenu from "./HeaderProductsMenu";

const HeaderNavMenu = () => {
    return (
      <Flex as='nav' gap='40px'>
        <HeaderProductsMenu />
        <Menu.Root>
          <Menu.Trigger asChild>
            <NavButton>Smart Home Services</NavButton>
          </Menu.Trigger>
        </Menu.Root>
        <Menu.Root>
          <Menu.Trigger asChild>
            <NavButton>Support</NavButton>
          </Menu.Trigger>
        </Menu.Root>
      </Flex>
    );
}
 
export default HeaderNavMenu;