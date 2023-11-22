import React, { Suspense } from "react";
import { Container, Heading, Skeleton, VStack } from "@chakra-ui/react";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { PlayerTable } from "./_components/PlayerTable";
import { RoomData } from "./_components/RoomData";
import { RoomContextProvider } from "../_context/room";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
          <RoomData roomId={+params.id} />
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
