import { Box } from "@chakra-ui/react";
import HomeHero from "@/components/home/HomeHero";
import WhyDigidiveSection from "@/components/home/WhyDigidiveSection";

const HomePage = () => {
  return (
    <Box>
      <HomeHero />
      <WhyDigidiveSection />
    </Box>
  );
};

export default HomePage;
