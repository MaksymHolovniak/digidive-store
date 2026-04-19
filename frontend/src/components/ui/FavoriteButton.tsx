import HeartIcon from "../../assets/heart.svg?react";
import HeartFilledIcon from "../../assets/heart-filled.svg?react";

type FavoriteButtonProps = {
  isActive: boolean;
};

const FavoriteButton = ({ isActive }: FavoriteButtonProps) => {
  return isActive ? (
    <HeartFilledIcon width="24px" height="24px" />
  ) : (
    <HeartIcon width="24px" height="24px" />
  );
};

export default FavoriteButton;
