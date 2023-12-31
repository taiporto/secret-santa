import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { EditPriceLimitInPlace } from "./_components/EditPriceLimitInPlace";
import { Players } from "./_components/Players";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoomById(+params.id);

  if (!room) {
    return <Heading>Something went wrong</Heading>;
  }
  return (
    <Box>
      <Breadcrumbs
        paths={[
          {
            label: "Evento",
            href: `#`,
            isCurrentPage: true,
          },
        ]}
      />
      <Box my={8}>
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
            <Players roomId={room.id} players={room.players} />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}
