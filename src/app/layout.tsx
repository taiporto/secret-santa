import "./globals.css";

import type { Metadata } from "next";
import { Heading, VStack } from "@chakra-ui/react";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Amigo Oculto",
  description: "Sorteie seu amigo oculto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <VStack p={4} pb={6}>
            <Heading as="h1">Amigo Oculto</Heading>
            {children}
          </VStack>
        </Providers>
      </body>
    </html>
  );
}
