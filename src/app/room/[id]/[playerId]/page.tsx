import React, { Suspense } from "react";

import { Box, Heading, SkeletonText, VStack } from "@chakra-ui/react";

import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllWishlistItemsByUserId } from "@/lib/api/users/wishlist/getAllWishlistItemsByUserId";
import { GifteeData } from "./_components/GifteeData";
import { GifterData } from "./_components/GifterData";
import { ContentWrapper } from "./_components/ContentWrapper";

export const revalidate = 0;

export default async function UserPage({
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

  const playersWishlist = await getAllWishlistItemsByUserId(+params.playerId);
  const gifteesWishlist = await getAllWishlistItemsByUserId(
    +sortedPlayers["giftee_id"]
  );

  if (!room || !player) return <Heading>Algo deu errado :(</Heading>;

  return (
    <Box maxW={{ base: "80%", lg: "80%" }} marginX={"auto"}>
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
      <VStack mt={12}>
        <Suspense
          fallback={
            <Heading as="h2" size="lg" textAlign="center">
              Oi, <SkeletonText noOfLines={1} w="100px" />
            </Heading>
          }
        >
          <Heading as="h2" size="lg" textAlign="center">
            Oi, {player.name}!
          </Heading>
        </Suspense>
        <ContentWrapper
          gifteeData={
            <GifteeData giftee={giftee} gifteesWishlist={gifteesWishlist} />
          }
          gifterData={
            <GifterData room={room} playersWishlist={playersWishlist} />
          }
        />
      </VStack>
    </Box>
  );
}
