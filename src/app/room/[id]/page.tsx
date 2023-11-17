import React from "react";
import {
  Box,
  Center,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { getUserById } from "@/lib/api/users/getUser";
import { User } from "../../../../types";
import { PlayerTable } from "@/components/PlayerTable";
import { RoomContextProvider } from "../_context/room";
import { ShareButtons } from "./_components/ShareButtons";
import { formatCurrency } from "@/utils/formatCurrency";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { updateRoom } from "@/lib/api/rooms/updateRoom";
import { EditPriceLimitInPlace } from "./_components/EditPriceLimitInPlace";

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
            {players.length > 0 && (
              <PlayerTable players={players} roomId={room.id} />
            )}
          </VStack>
        </VStack>
        <Center>
          <ShareButtons players={players} />
        </Center>
      </Container>
    </RoomContextProvider>
  );
}
