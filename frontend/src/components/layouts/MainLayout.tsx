import { Box } from "@chakra-ui/react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box as="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
