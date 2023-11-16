import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Highlight,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRoomContext } from "../../_context/room";
import { GifteeCard } from "./_components/GifteeCard";
import { getRoomById } from "@/lib/api/rooms/getRoom";

export default async function RoomPage({
  params,
}: {
  params: { playerId: string; id: string };
}) {
  const player = await getUserById(+params.playerId);
  const sortedPlayers = await getSortedPlayersByGifterId(+params.playerId);

  if (!sortedPlayers) {
    return <Heading>Erro ao carregar página :(</Heading>;
  }

  const giftee = await getUserById(+sortedPlayers["giftee_id"]);
  const room = await getRoomById(+params.id);

  return (
    <VStack my={14}>
      <Heading as="h2" size="lg">
        Oi, {player?.name} :)
      </Heading>
      <Text>Clique abaixo para descobrir quem você vai presentear:</Text>
      <GifteeCard giftee={giftee!} room={room} />
    </VStack>
  );
}
