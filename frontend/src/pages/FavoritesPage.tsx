import ProductCard from "@/components/product/product-card/ProductCard";
import AppContainer from "@/components/ui/AppContainer";
import PageLoader from "@/components/ui/PageLoader";
import { useGetProfileQuery } from "@/store/api/user.api";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const FavoritesPage = () => {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading) return <PageLoader />;

  const favoritesProducts = profile?.favorites.map((f) => f.product) || [];
  const totalFavorites = favoritesProducts.length;

  return (
    <Box pt="60px" pb="140px" as="section">
      <AppContainer>
        <Heading as="h1" fontSize="40px" color="#464646" lineHeight="110%" mb="30px">
          Your favorites ({totalFavorites})
        </Heading>

        {totalFavorites === 0 ? (
          <Text color="gray.500" fontSize="20px" textAlign="center" py="50px">
            У вас ще немає улюблених товарів.
          </Text>
        ) : (
          <Flex gap="80px" wrap="wrap" justify="flex-start">
            {favoritesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        )}
      </AppContainer>
    </Box>
  );
};

export default FavoritesPage;
