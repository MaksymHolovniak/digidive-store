import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: "Poppins, sans-serif" },
        heading: { value: "Poppins, sans-serif" },
      },
    },
  },
});

export default system;
