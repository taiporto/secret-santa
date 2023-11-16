import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Highlight,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GifteeCard } from "./_components/GifteeCard";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import ReactCardFlip from "react-card-flip";

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

  if (!room) return null;

  return (
    <VStack my={14}>
      <Heading as="h2" size="lg" mb={4}>
        Oi, {player?.name}!
      </Heading>
      <Text>Clique abaixo para descobrir quem você vai presentear:</Text>
      <Box>
        <GifteeCard giftee={giftee!} room={room} />
      </Box>
    </VStack>
  );
}
