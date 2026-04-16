import AppBreadcrumbs from "@/components/ui/AppBreadCrumbs";
import AppContainer from "@/components/ui/AppContainer";
import { Box } from "@chakra-ui/react";
import ProductInfoSection from "@/components/product/ProductInfoSection";
import SimilarProductsSection from "@/components/product/SimilarProductsSection";
import { useEffect } from "react";

const ProductPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box pt="65px" pb="96px">
      <AppContainer>
        <AppBreadcrumbs
          secondPage="Smart Home Security Solutions"
          secondPagePath="/products"
          thirdPage="Wyze Cam v3"
        />
        <ProductInfoSection />
        <SimilarProductsSection />
      </AppContainer>
    </Box>
  );
};

export default ProductPage;
