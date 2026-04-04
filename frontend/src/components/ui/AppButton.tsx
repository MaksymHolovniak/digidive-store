import { Button, type ButtonProps } from "@chakra-ui/react";

interface AppButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AppButton = ({ children, ...props }: AppButtonProps) => {
  return (
    <Button
      borderRadius="8px"
      border={"none"}
      bgGradient="linear-gradient(92deg, #5FD8FF 0.39%, #9969FF 65.86%, #704FE5 102.04%)"
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
