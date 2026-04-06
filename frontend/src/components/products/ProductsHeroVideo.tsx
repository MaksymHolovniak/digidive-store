import { Box } from "@chakra-ui/react";
import productsHeroVideo from "../../assets/products-hero-video.mp4";
import s from "./Products.module.css";

const ProductsHeroVideo = () => {
  return (
    <Box mx="auto" mb="40px">
      <video className={s.video} autoPlay playsInline loop muted>
        <source src={productsHeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default ProductsHeroVideo;
