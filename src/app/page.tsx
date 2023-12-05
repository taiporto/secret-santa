import { Center } from "@chakra-ui/react";
import { MainForm } from "@/components/MainForm";
import { createRoom } from "@/lib/api/rooms/createRoom";
import { bulkCreateUsers } from "@/lib/api/users/createUser";
import { sortPlayers } from "../utils/sortPlayers";
import { bulkCreateSortedPlayers } from "@/lib/api/sortedPlayers/createSortedPlayers";

export default async function Home() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    try {
      const roomName = (data.get("roomName") as string) ?? "Evento sem nome";
      const priceLimit = data.get("priceLimit") as string;

      const userNames = ([...data.entries()] as [string, string][]).flatMap(
        ([key, value]) =>
          key.includes("player") && value !== "" ? [value] : []
      );

      const playerIds = await bulkCreateUsers(userNames);

      if (playerIds.length === 0) {
        console.error("Empty player list");
      }

      const room = await createRoom({
        roomName: roomName,
        priceLimit: +priceLimit,
        players: playerIds,
      });

      if (!room) {
        console.error("Room not created");
        return;
      }

      const sortedPlayers = await bulkCreateSortedPlayers(
        sortPlayers(playerIds),
        room.id
      );

      if (!sortedPlayers) {
        console.error("Sorted players not created");
        return;
      }

      return room.id;
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <Center>
      <MainForm handleSubmit={handleSubmit} />
    </Center>
  );
}
