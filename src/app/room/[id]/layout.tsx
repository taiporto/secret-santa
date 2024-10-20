import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box as="main" w="100%" pt={{ base: 6, md: 4 }}>
      {children}
    </Box>
  );
}
