import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Room, User } from "../../../types";
import { useRoomContext } from "@/app/room/_context/room";
import Link from "next/link";

const generatePlayerLink = (playerId: User["id"], roomId: Room["id"]) => {
  return `/room/${roomId}/${playerId}`;
};

export const PlayerTable = ({ players, roomId }) => {
  return (
    <Table>
      <Thead>
        <Th>Participante</Th>
        <Th>Link</Th>
        <Th>Copiar link</Th>
      </Thead>
      <Tbody>
        {players?.map((player: User) => {
          const playerLink = generatePlayerLink(player.id, roomId);
          return (
            <Tr key={player.id}>
              <Th>{player.name}</Th>
              <Th>
                <Link href={playerLink} target="_blank">
                  {process.env.PROJECT_URL}
                  {playerLink}
                </Link>
              </Th>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
