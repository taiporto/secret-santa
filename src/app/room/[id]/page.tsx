import React from "react";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { getUserById } from "@/lib/api/users/getUser";
import { User } from "../../../../types";
import { PlayerTable } from "@/components/PlayerTable";
import { RoomContextProvider } from "../_context/room";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoomById(+params.id);
  const players: User[] = [];

  if (!room)
    return (
      <Container>
        <Heading as="h2">Evento não encontrado :(</Heading>
      </Container>
    );

  if (!room.players) {
    console.error("Empty player list");
  }

  for (const playerId of room.players) {
    const player = await getUserById(playerId);
    if (!player) continue;
    players.push(player);
  }

  return (
    <RoomContextProvider value={room.id}>
      <Container my={14}>
        <VStack my={6} gap={16}>
          <Box>
            <span>Evento:</span>
            <Heading as="h2" size="lg" textAlign="center">
              {room.name}
            </Heading>
          </Box>
          <VStack align="center">
            <Heading as="h3" size="md">
              Participantes
            </Heading>
            {players.length > 0 && (
              <PlayerTable players={players} roomId={room.id} />
            )}
          </VStack>
        </VStack>
      </Container>
    </RoomContextProvider>
  );
}
