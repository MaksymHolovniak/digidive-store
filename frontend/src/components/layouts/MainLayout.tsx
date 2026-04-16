import { Box } from "@chakra-ui/react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import { Suspense } from "react";
import PageLoader from "../ui/PageLoader";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box as="main">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
