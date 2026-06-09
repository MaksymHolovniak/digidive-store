import { Box, Flex } from "@chakra-ui/react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import { Suspense } from "react";
import PageLoader from "../ui/PageLoader";

const MainLayout = () => {
  return (
    <Flex direction="column" minH="100dvh" w='100%'>
      <Header />
      <Box as="main" flex='1'>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
