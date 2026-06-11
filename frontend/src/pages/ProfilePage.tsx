import AppContainer from "@/components/ui/AppContainer";
import PageLoader from "@/components/ui/PageLoader";
import { useGetProfileQuery } from "@/store/api/user.api";
import { Box, Flex, Heading, Grid } from "@chakra-ui/react";
import { useGetUserOrdersQuery } from "@/store/api/order.api";
import ProfileInfo from "@/components/profile/ProfileInfo";
import EmptyOrders from "@/components/profile/EmptyOrders";
import OrderItemCard from "@/components/profile/OrderItemCard";

const ProfilePage = () => {
  const { data: profile, isLoading: isUserLoading } = useGetProfileQuery();
  const { data: orders, isLoading: isOrdersLoading } = useGetUserOrdersQuery();

  if (isUserLoading || isOrdersLoading) return <PageLoader />;

  return (
    <Box py="60px" bg="#FAFAFA" minH="calc(100vh - 120px)">
      <AppContainer>
        <Heading as="h1" fontSize="36px" color="#464646" mb="40px">
          Personal Account
        </Heading>

        <Grid templateColumns={{ base: "100%", lg: "320px 1fr" }} gap="40px" alignItems="flex-start">
          <ProfileInfo email={profile?.email} />

          <Box>
            <Heading as="h2" fontSize="22px" color="#464646" mb="24px">
              Order History ({orders?.length || 0})
            </Heading>
            {!orders || orders.length === 0 ? (
              <EmptyOrders />
            ) : (
              <Flex direction="column" gap="24px">
                {orders.map((order) => (
                  <OrderItemCard key={order.id} order={order} />
                ))}
              </Flex>
            )}
          </Box>
        </Grid>
      </AppContainer>
    </Box>
  );
};

export default ProfilePage;
