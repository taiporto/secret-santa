import React from "react";
import { Room, User as UserType } from "../../../../../../types";
import {
  Center,
  Divider,
  Heading,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { ShareButtons } from "../ShareButtons";
import { getUsersById } from "@/lib/api/users/getUser";
import { PlayerLink } from "../PlayerTable/components/PlayerLink";
import { generatePlayerLink } from "@/utils/generatePlayerLink";

type PlayerListProps = {
  playerIds: UserType["id"][];
  roomId: Room["id"];
};

export const PlayerList = async ({ playerIds, roomId }: PlayerListProps) => {
  const players = await getUsersById(playerIds);

  return (
    <VStack spacing={6}>
      <List spacing={4} maxW="100%">
        {players.map((player) => {
          const playerLink = generatePlayerLink(player.id, roomId);
          return (
            <ListItem key={player.id}>
              <Heading as="h4" size="sm">
                {player.name}
              </Heading>
              <PlayerLink playerLink={playerLink} />
              <Divider mt={4} />
            </ListItem>
          );
        })}
      </List>
      <Center>
        <ShareButtons players={players} roomId={roomId} />
      </Center>
    </VStack>
  );
};
