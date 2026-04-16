import { Input } from "@chakra-ui/react";

const AppInput = ({ ...props }) => {
  return (
    <Input fontSize="16px" borderColor="#E4D9FD" css={{ "--focus-color": "#7449df" }} {...props} />
  );
};

export default AppInput;
