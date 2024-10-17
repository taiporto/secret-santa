"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";

import { Poppins } from "next/font/google";

import { colors } from "@/theme";
import { globalStore } from "@/jotai/globalStore";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "600", "700"],
});

export const theme = extendTheme({
  colors,
  fonts: {
    heading: "var(--font-poppins)",
    body: "var(--font-poppins)",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <CacheProvider>
        <JotaiProvider store={globalStore}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </JotaiProvider>
      </CacheProvider>
    </>
  );
}
