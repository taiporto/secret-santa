import React from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { Room, User } from "../../../types";
import { PlayerLink } from "./components/PlayerLink";
import { generatePlayerLink } from "@/utils/generatePlayerLink";

type PlayerTableProps = {
  players: User[];
  roomId: Room["id"];
};

export const PlayerTable = ({ players, roomId }: PlayerTableProps) => {
  return (
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
  );
};
