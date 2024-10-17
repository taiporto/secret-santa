import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box maxW={{ base: "80%", lg: "60%" }} marginX={"auto"} p={4}>
      {children}
    </Box>
  );
}
