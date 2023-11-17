import { getSortedPlayersByGifterId } from "@/lib/api/sortedPlayers/getSortedPlayers";
import { getUserById } from "@/lib/api/users/getUser";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Highlight,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GifteeCard } from "./_components/GifteeCard";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import ReactCardFlip from "react-card-flip";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaChevronRight } from "react-icons/fa";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
        <Heading as="h2" size="lg" mb={4}>
          Oi, {player.name}!
        </Heading>
        <Text>Clique abaixo para descobrir quem você vai presentear:</Text>
        <Box>
          <GifteeCard giftee={giftee!} room={room} />
        </Box>
      </VStack>
    </>
  );
}
