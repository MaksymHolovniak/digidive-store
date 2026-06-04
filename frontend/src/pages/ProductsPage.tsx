import Filters from "@/components/products/filters/Filters";
import ProductsHeroVideo from "@/components/products/ProductsHeroVideo";
import ProductsList from "@/components/products/ProductsList";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsSorting from "@/components/products/sorting/ProductsSorting";
import AppBreadcrumbs from "@/components/ui/AppBreadCrumbs";
import AppContainer from "@/components/ui/AppContainer";
import PageLoader from "@/components/ui/PageLoader";
import { useGetCategoriesQuery } from "@/store/api/category.api";
import { useGetProductsQuery } from "@/store/api/product.api";
import type { FilterState, SortValue } from "@/types/product.types";
import { getBreadcrumbsData } from "@/utils/breadcrumbs.utils";
import { getMainCategory } from "@/utils/category.utils";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

const initialFilters: FilterState = {
  searchTerm: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
};

const ProductsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const [page, setPage] = useState(1);
  const [prevCategoryId, setPrevCategoryId] = useState(categoryId);
  const [activeFilters, setActiveFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortValue>("default");

  const catalogRef = useRef<HTMLDivElement>(null);

  if (categoryId !== prevCategoryId) {
    setPrevCategoryId(categoryId);
    setPage(1);
    setActiveFilters(initialFilters);
  }

  useEffect(() => {
    if (page === 1) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      catalogRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [categoryId, page]);

  const { data, isLoading, isFetching } = useGetProductsQuery({
    categoryId: Number(categoryId),
    page,
    perPage: ITEMS_PER_PAGE,
    sort: sort === "default" ? undefined : sort,
    searchTerm: activeFilters.searchTerm,
    brand: activeFilters.brand,
    minPrice: activeFilters.minPrice ? Number(activeFilters.minPrice) : undefined,
    maxPrice: activeFilters.maxPrice ? Number(activeFilters.maxPrice) : undefined,
  });

  const { data: categories = [] } = useGetCategoriesQuery();

  const currentCategory = getMainCategory(categories, categoryId);

  const { parentName, parentPath, childName } = getBreadcrumbsData(categories, categoryId);

  const totalItems = data?.length || 0;

  return (
    <Box pt="20px" pb="96px">
      <ProductsHeroVideo />
      <AppContainer>
        <Flex ref={catalogRef} direction="column" gap="50px" scrollMarginTop="20px">
          <AppBreadcrumbs
            secondPage={parentName}
            secondPagePath={parentPath}
            thirdPage={childName}
          />
          <Flex justifyContent="space-between">
            <Filters
              currentCategory={currentCategory}
              activeFilters={activeFilters}
              onApplyFilters={(filters) => {
                setActiveFilters(filters);
                setPage(1);
              }}
            />
            <Flex direction="column" gap="50px" maxW="1170px" w="100%">
              <ProductsSorting
                totalItems={totalItems}
                sortValue={sort}
                onSortChange={(newSort) => {
                  setSort(newSort);
                  setPage(1);
                }}
              />

              {isLoading || isFetching ? (
                <PageLoader />
              ) : (
                <>
                  <ProductsList products={data?.products || []} />

                  {totalItems > ITEMS_PER_PAGE && (
                    <ProductsPagination
                      currentPage={page}
                      totalCount={totalItems}
                      pageSize={ITEMS_PER_PAGE}
                      onPageChange={setPage}
                    />
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default ProductsPage;
