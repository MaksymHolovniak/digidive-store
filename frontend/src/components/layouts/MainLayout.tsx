import { Box } from "@chakra-ui/react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Box as="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
