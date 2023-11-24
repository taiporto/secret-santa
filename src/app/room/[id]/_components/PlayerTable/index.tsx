import React from "react";
import { Table, Thead, Tbody, Tr, Th, Center } from "@chakra-ui/react";
import { Room, User } from "../../../../../../types";
import { PlayerLink } from "./components/PlayerLink";
import { generatePlayerLink } from "@/utils/generatePlayerLink";
import { ShareButtons } from "@/app/room/[id]/_components/ShareButtons";
import { getUserById } from "@/lib/api/users/getUser";

type PlayerTableProps = {
  playerIds: User["id"][];
  roomId: Room["id"];
};

export const PlayerTable = async ({ playerIds, roomId }: PlayerTableProps) => {
  const players = [];

  for (const playerId of playerIds) {
    const player = await getUserById(playerId);
    if (!player) continue;
    players.push(player);
  }

  return (
    <>
      <Table>
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
        <ShareButtons players={players} roomId={roomId} />
      </Center>
    </>
  );
};
