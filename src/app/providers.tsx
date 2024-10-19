"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";

import { colors } from "@/theme";
import { globalStore } from "@/jotai/globalStore";

export const theme = extendTheme({
  colors,
  fonts: {
    heading: "sans-serif",
    body: "sans-serif",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CacheProvider>
        <JotaiProvider store={globalStore}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </JotaiProvider>
      </CacheProvider>
    </>
  );
}
