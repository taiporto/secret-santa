import type { Metadata } from "next";
import { Heading, Center } from "@chakra-ui/react";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Amigo Oculto",
  description: "Sorteie seu amigo oculto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Center>
            <Heading as="h1">Amigo Oculto</Heading>
          </Center>
          {children}
        </Providers>
      </body>
    </html>
  );
}
