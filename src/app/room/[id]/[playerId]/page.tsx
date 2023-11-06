import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import { Heading } from "@chakra-ui/react";

export default async function RoomPage({
  params,
}: {
  params: { playerId: string };
}) {
  const player = await getUserById(+params.playerId);
  const sortedPlayers = await getSortedPlayersByGifterId(+params.playerId);

  if (!sortedPlayers) {
    return <Heading>Erro ao carregar página</Heading>;
  }

  const giftee = await getUserById(+sortedPlayers["giftee_id"]);

  return (
    <>
      <Heading>{player?.name}</Heading>
      <p>Você sorteou</p>
      <p>{giftee?.name}</p>
    </>
  );
}
