import React, { Suspense } from "react";

import {
  Box,
  HStack,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";

import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import { GifteeCard } from "./_components/GifteeCard";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RoomData } from "./_components/RoomData";
import { MyWishlist } from "./_components/MyWishlist";

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
      <Suspense fallback={<p>Carregando...</p>}>
        <VStack>
          <Heading as="h2" size="lg" textAlign="center">
            Oi, {player.name}!
          </Heading>
          <HStack
            my={16}
            gap={6}
            divider={<StackDivider />}
            justify="flex-start"
            align="flex-start"
          >
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Quem você sorteou
              </Heading>
              <GifteeCard giftee={giftee} />
            </Box>
            <VStack align="left" divider={<StackDivider />} gap={6}>
              <RoomData room={room} />
              <Box>
                <Heading as="h3" size="md" mb={4}>
                  Minha lista de presentes
                </Heading>
                <MyWishlist wishlist={player.wishlist} />
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </Suspense>
    </>
  );
}
