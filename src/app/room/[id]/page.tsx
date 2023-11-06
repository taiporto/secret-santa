import React from "react";
import { Heading } from "@chakra-ui/react";
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
      <div>
        <Heading as="h2">Evento não encontrado</Heading>
      </div>
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
    <div>
      <Heading as="h2">{room.name}</Heading>
      <RoomContextProvider value={room.id}>
        <div>
          {players.length > 0 && (
            <PlayerTable players={players} roomId={room.id} />
          )}
        </div>
      </RoomContextProvider>
    </div>
  );
}
