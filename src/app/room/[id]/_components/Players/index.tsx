import React, { Suspense } from "react";
import { Room, User } from "../../../../../../types";
import { PlayerTable } from "../PlayerTable";
import { PlayerList } from "../PlayerList";
import { Hide, Show, Skeleton } from "@chakra-ui/react";

type PlayersProps = {
  players: User["id"][];
  roomId: Room["id"];
};

export const Players = ({ players, roomId }: PlayersProps) => {
  return (
    <>
      <Show above="md">
        <Suspense fallback={<Skeleton height="600px" />}>
          <PlayerTable playerIds={players} roomId={roomId} />
        </Suspense>
      </Show>
      <Hide above="md">
        <PlayerList playerIds={players} roomId={roomId} />
      </Hide>
    </>
  );
};
