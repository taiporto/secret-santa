import React from "react";
import { Room, User } from "../../../../../../types";
import {
  Center,
  Divider,
  Heading,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { ShareButtons } from "../ShareButtons";
import { PlayerLink } from "./components/PlayerLink";
import { generatePlayerLink } from "@/utils/generatePlayerLink";

type PlayerListProps = {
  players: User[];
  roomId: Room["id"];
};

export const PlayerList = ({ players, roomId }: PlayerListProps) => {
  return (
    <VStack gap={{ base: 6, md: 12 }}>
      <List spacing={4} w={{ base: "100%", md: "80%" }} p={{ base: 4, md: 0 }}>
        {players.map((player) => {
          return (
            <ListItem key={player.id}>
              <Heading as="h4" size={["sm", "md"]}>
                {player.name}
              </Heading>
              <PlayerLink player={player} roomId={roomId} />
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
