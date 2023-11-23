import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { GifteeCard } from "./_components/GifteeCard";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Suspense } from "react";

export const revalidate = 10;

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

  if (!room || !player) return <Heading>Algo deu errado :(</Heading>;

  return (
    <>
      <Breadcrumbs
        paths={[
          {
            label: "Evento",
            href: `/room/${room.id}`,
          },
          {
            label: player.name,
            href: `#`,
            isCurrentPage: true,
          },
        ]}
      />
      <VStack my={10}>
        <Suspense fallback={<p>Carregando usuário...</p>}>
          <Heading as="h2" size="lg" mb={4}>
            Oi, {player.name}!
          </Heading>
        </Suspense>
        <Text>Clique abaixo para descobrir quem você vai presentear:</Text>
        <Suspense fallback={<p>Carregando sorteio...</p>}>
          <Box>
            <GifteeCard giftee={giftee!} room={room} />
          </Box>
        </Suspense>
      </VStack>
    </>
  );
}
