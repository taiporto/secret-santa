import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box w="100%" pt={4}>
      {children}
    </Box>
  );
}
