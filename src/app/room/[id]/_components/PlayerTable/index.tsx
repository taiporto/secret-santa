import React from "react";
import { Table, Thead, Tbody, Tr, Th, Center } from "@chakra-ui/react";
import { Room, User } from "../../../../../../types";
import { PlayerLink } from "./components/PlayerLink";
import { generatePlayerLink } from "@/utils/generatePlayerLink";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { getUserById } from "@/lib/api/users/getUser";
import { ShareButtons } from "@/app/room/[id]/_components/ShareButtons";

type PlayerTableProps = {
  roomId: Room["id"];
};

export const PlayerTable = async ({ roomId }: PlayerTableProps) => {
  const room = await getRoomById(roomId);
  const players = [];

  if (!room) {
    console.error("Room not found");
    return;
  }

  if (!room.players) {
    console.error("Empty player list");
  }

  for (const playerId of room.players) {
    const player = await getUserById(playerId);
    if (!player) continue;
    players.push(player);
  }

  return (
    <>
      <Table overflowX="auto">
        <Thead>
          <Tr>
            <Th>Participante</Th>
            <Th>Link pessoal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {players?.map((player: User) => {
            const playerLink = generatePlayerLink(player.id, roomId);
            return (
              <Tr key={player.id}>
                <Th>{player.name}</Th>
                <Th>
                  <PlayerLink playerLink={playerLink} />
                </Th>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Center>
        <ShareButtons players={players} />
      </Center>
    </>
  );
};
