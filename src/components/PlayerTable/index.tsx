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

const generatePlayerLink = (playerId: User["id"], roomId: Room["id"]) => {
  return `/room/${roomId}/${playerId}`;
};

export const PlayerTable = ({ players }) => {
  const { roomId } = useRoomContext();
  return (
    <Table>
      <Thead>
        <Th>Participante</Th>
        <Th>Link</Th>
        <Th>Copiar link</Th>
      </Thead>
      <Tbody>
        {players?.map((player: User) => {
          return (
            <Tr key={player.id}>
              <Th>{player.name}</Th>
              <Th>{generatePlayerLink(player.id, roomId)}</Th>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
