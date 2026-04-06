import Filters from "@/components/products/filters/Filters";
import ProductsHeroVideo from "@/components/products/ProductsHeroVideo";
import AppBreadcrumbs from "@/components/ui/AppBreadCrumbs";
import AppContainer from "@/components/ui/AppContainer";
import { Box, Flex } from "@chakra-ui/react";

const ProductsPage = () => {
  return (
    <Box pt="20px" pb="140px">
      <ProductsHeroVideo />
      <AppContainer>
        <Flex direction="column" gap="50px">
          <AppBreadcrumbs
            secondPage="Smart Home Security Solutions"
            secondPagePath="/product"
            thirdPage="Security Cameras"
          />
          <Flex justifyContent="space-between">
            <Filters />
          </Flex>
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default ProductsPage;
