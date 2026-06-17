import HeartIcon from "../../assets/heart.svg?react";
import HeartFilledIcon from "../../assets/heart-filled.svg?react";

type FavoriteButtonProps = {
  isActive: boolean;
  disabled?: boolean;
};

const FavoriteButton = ({ isActive, disabled = false }: FavoriteButtonProps) => {
  const iconStyle = disabled ? { color: "#A0AEC0", fill: "#A0AEC0" } : undefined;

  return isActive ? (
    <HeartFilledIcon width="24px" height="24px" style={iconStyle} />
  ) : (
    <HeartIcon width="24px" height="24px" style={iconStyle} />
  );
};

export default FavoriteButton;
