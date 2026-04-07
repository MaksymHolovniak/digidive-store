import AppButton from "@/components/ui/AppButton";
import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import AddedToCart from "../../../assets/added-to-cart.svg";
import { LuPlus } from "react-icons/lu";

const AddToCartButton = ({ ...props }) => {
  const [clicked, setClicked] = useState(false);

  const handleAddToCart = () => {
    setClicked(true);
  };

  return (
    <Box w="100%">
      {clicked ? (
        <AppButton
          {...props}
          fontSize="18px"
          bg="#FFF"
          border={"2px solid #7EB96A"}
          color="#1D1D1D"
          fontWeight="600"
        >
          Added
          <Image src={AddedToCart} alt="Check Icon" />
        </AppButton>
      ) : (
        <AppButton fontSize="18px" {...props} onClick={handleAddToCart}>
          Add to Cart
          <LuPlus size={20} />
        </AppButton>
      )}
    </Box>
  );
};

export default AddToCartButton;
