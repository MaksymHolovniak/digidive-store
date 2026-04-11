import { Box, Stack } from "@chakra-ui/react";
import HomeHero from "@/components/home/HomeHero";
import WhyDigidiveSection from "@/components/home/WhyDigidiveSection";
import HomeAutomationSection from "@/components/home/HomeAutomationSection";

const HomePage = () => {
  return (
    <Box>
      <Stack gap="100px">
        <HomeHero />
        <WhyDigidiveSection />
        <Box mb="100px">
          <HomeAutomationSection />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
