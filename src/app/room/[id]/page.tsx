import React, { Suspense } from "react";
import { Container, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { PlayerTable } from "@/components/PlayerTable";
import { RoomContextProvider } from "../_context/room";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EditPriceLimitInPlace } from "./_components/EditPriceLimitInPlace";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoomById(+params.id);

  if (!room)
    return (
      <Container>
        <Heading as="h2">Evento não encontrado :(</Heading>
      </Container>
    );

  return (
    <RoomContextProvider value={room}>
      <Breadcrumbs
        paths={[
          {
            label: "Evento",
            href: `#`,
            isCurrentPage: true,
          },
        ]}
      />
      <Container my={8}>
        <VStack my={6} gap={12}>
          <VStack align="center">
            <Text>Evento:</Text>
            <Heading as="h2" size="lg" textAlign="center">
              {room.name}
            </Heading>
          </VStack>
          <VStack align="center">
            <Text>Limite de valor:</Text>
            <EditPriceLimitInPlace room={room} />
          </VStack>
          <VStack align="center" gap={6}>
            <Heading as="h3" size="md">
              Participantes
            </Heading>
            <Suspense fallback={<Skeleton height="600px" />}>
              <PlayerTable roomId={room.id} />
            </Suspense>
          </VStack>
        </VStack>
      </Container>
    </RoomContextProvider>
  );
}
