import React, { Suspense } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Heading,
  SkeletonText,
  StackDivider,
  VStack,
} from "@chakra-ui/react";

import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import { GifteeCard } from "./_components/GifteeCard";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RoomData } from "./_components/RoomData";
import { MyWishlist } from "./_components/MyWishlist";
import { WishlistItem as TWishlistItem } from "../../../../../types";
import { getAllWishlistItemsByUserId } from "@/lib/api/users/wishlist/getAllWishlistItemsByUserId";
import { WishlistItem } from "./_components/MyWishlist/components/WishlistItem";

export const revalidate = 0;

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
        <HStack
          my={16}
          gap={6}
          divider={<StackDivider />}
          justify="flex-start"
          align="flex-start"
        >
          <VStack gap={4} align="left">
            <Heading as="h3" size="md" mb={4}>
              Quem você sorteou
            </Heading>
            <GifteeCard giftee={giftee} />
            {!!gifteesWishlist?.length && (
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    Lista de presentes do sorteado
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {gifteesWishlist.map((item: TWishlistItem) => {
                      return (
                        <Box key={item.id}>
                          <Box my="4">
                            <WishlistItem
                              wishlistItemData={item}
                              allowDelete={false}
                            />
                          </Box>
                          <Divider />
                        </Box>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          </VStack>
          <VStack
            align="left"
            divider={<StackDivider />}
            gap={6}
            minW="60%"
            maxW="60%"
          >
            <RoomData room={room} />
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Minha lista de presentes
              </Heading>
              <MyWishlist initialWishlist={playersWishlist} />
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}
