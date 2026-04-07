import AppBreadcrumbs from "@/components/ui/AppBreadCrumbs";
import AppContainer from "@/components/ui/AppContainer";
import { Box } from "@chakra-ui/react";

const ProductPage = () => {
  return (
    <Box pt="65px" pb="140px">
      <AppContainer>
        <AppBreadcrumbs
          secondPage="Smart Home Security Solutions"
          secondPagePath="/products"
          thirdPage="Wyze Cam v3"
        />
      </AppContainer>
    </Box>
  );
};

export default ProductPage;
