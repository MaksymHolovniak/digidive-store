import AppBreadcrumbs from "@/components/ui/AppBreadCrumbs";
import AppContainer from "@/components/ui/AppContainer";
import { Box, Text } from "@chakra-ui/react";
import ProductInfoSection from "@/components/product/ProductInfoSection";
import SimilarProductsSection from "@/components/product/SimilarProductsSection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetSimilarProductsQuery } from "@/store/api/product.api";
import PageLoader from "@/components/ui/PageLoader";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [similarPage, setSimilarPage] = useState(1);
  const SIMILAR_PER_PAGE = 5;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSimilarPage(1);
  }, [id]);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const { data: similarProducts, isLoading: isSimilarLoading } = useGetSimilarProductsQuery(
    { id: productId, perPage: SIMILAR_PER_PAGE, page: similarPage },
    { skip: !productId },
  );

  if (isLoading) return <PageLoader />;
  if (error || !product) {
    return (
      <AppContainer>
        <Text color="red.400" textAlign="center" py="100px">
          Product not found.
        </Text>
      </AppContainer>
    );
  }

  const categoryName = product.category?.name || "Catalog";
  const categoryPath = product.category?.id ? `/products/${product.category.id}` : "/products";

  return (
    <Box pt="65px" pb="96px">
      <AppContainer>
        <AppBreadcrumbs secondPage={categoryName} secondPagePath={categoryPath} thirdPage={product.name} />
        <ProductInfoSection product={product} />
        <SimilarProductsSection
          products={similarProducts?.products || []}
          totalCount={similarProducts?.length || 0}
          currentPage={similarPage}
          pageSize={SIMILAR_PER_PAGE}
          onPageChange={setSimilarPage}
          isLoading={isSimilarLoading}
        />
      </AppContainer>
    </Box>
  );
};

export default ProductPage;
