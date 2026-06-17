import Filters from "@/components/products/filters/Filters";
import ProductsHeroVideo from "@/components/products/ProductsHeroVideo";
import ProductsList from "@/components/products/ProductsList";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsSorting from "@/components/products/sorting/ProductsSorting";
import AppBreadcrumbs from "@/components/ui/AppBreadCrumbs";
import AppContainer from "@/components/ui/AppContainer";
import PageLoader from "@/components/ui/PageLoader";
import { useGetBrandsQuery } from "@/store/api/brand.api";
import { useGetCategoriesQuery } from "@/store/api/category.api";
import { useGetProductsQuery } from "@/store/api/product.api";
import type { FilterState, GridViewType, SortValue } from "@/types/product.types";
import { getBreadcrumbsData } from "@/utils/breadcrumbs.utils";
import { getMainCategory } from "@/utils/category.utils";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams] = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<FilterState>(() => {
    const urlSearch = searchParams.get("search") || "";
    return {
      searchTerm: urlSearch,
      brand: "",
      minPrice: "",
      maxPrice: "",
    };
  });

  const [page, setPage] = useState(1);
  const [prevCategoryId, setPrevCategoryId] = useState(categoryId);
  const [sort, setSort] = useState<SortValue>("default");
  const [view, setView] = useState<GridViewType>("grid-2");

  const itemsPerPage = view === "grid-2" ? 8 : 12;
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("search")) {
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }, []);

  if (categoryId !== prevCategoryId) {
    setPrevCategoryId(categoryId);
    setPage(1);
    setActiveFilters({ searchTerm: "", brand: "", minPrice: "", maxPrice: "" });
    setSort("default");
    setView("grid-2");
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
    categoryId: categoryId ? Number(categoryId) : undefined,
    page,
    perPage: itemsPerPage,
    sort: sort === "default" ? undefined : sort,
    searchTerm: activeFilters.searchTerm || undefined,
    brand: activeFilters.brand || undefined,
    minPrice: activeFilters.minPrice ? Number(activeFilters.minPrice) : undefined,
    maxPrice: activeFilters.maxPrice ? Number(activeFilters.maxPrice) : undefined,
  });

  const { data: brands = [] } = useGetBrandsQuery(categoryId ? Number(categoryId) : undefined);
  const { data: categories = [] } = useGetCategoriesQuery();

  const currentCategory = categoryId ? getMainCategory(categories, categoryId) : null;
  const breadcrumbs = categoryId ? getBreadcrumbsData(categories, categoryId) : null;
  const totalItems = data?.length || 0;

  return (
    <Box pt="20px" pb="96px">
      <ProductsHeroVideo />
      <AppContainer>
        <Flex ref={catalogRef} direction="column" gap="50px" scrollMarginTop="20px">
          {categoryId && breadcrumbs && (
            <AppBreadcrumbs
              secondPage={breadcrumbs.parentName}
              secondPagePath={breadcrumbs.parentPath}
              thirdPage={breadcrumbs.childName}
            />
          )}
          <Flex justifyContent="space-between">
            <Filters
              brands={brands}
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
                view={view}
                onViewChange={(newView) => {
                  setView(newView);
                  setPage(1);
                }}
              />

              {isLoading || isFetching ? (
                <PageLoader />
              ) : (
                <>
                  <ProductsList products={data?.products || []} />

                  {totalItems > itemsPerPage && (
                    <ProductsPagination
                      currentPage={page}
                      totalCount={totalItems}
                      pageSize={itemsPerPage}
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
