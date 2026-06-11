import ProductCard from "@/components/product/product-card/ProductCard";
import AppButton from "@/components/ui/AppButton";
import AppContainer from "@/components/ui/AppContainer";
import PageLoader from "@/components/ui/PageLoader";
import { useGetProfileQuery } from "@/store/api/user.api";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import arrowRight from "../assets/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";

const FavoritesPage = () => {
  const navigate = useNavigate()
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
          <Flex justifyContent="center" direction="column" align="center" textAlign="center" gap="24px" py="100px">
            <Box color="gray.300" mb="8px">
              <LuHeart size={80} strokeWidth={1.5} />
            </Box>
            <Text color="#000" fontSize="24px">
              You don't have any favorite products yet
            </Text>
            <AppButton
              p="16px 32px"
              h="52px"
              fontSize="16px"
              _hover={{
                transform: "translateY(-2px)",
              }}
              onClick={() => navigate("/products", { replace: true })}
            >
              Continue Shopping
              <Image src={arrowRight} alt="Arrow Right" />
            </AppButton>
          </Flex>
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
