import { Center } from "@chakra-ui/react";
import { MainForm } from "@/components/MainForm";
import { createRoom } from "@/lib/api/rooms/createRoom";
import { createUser } from "@/lib/api/users/createUser";
import { sortPlayers } from "../utils/sortPlayers";
import { createSortedPlayers } from "@/lib/api/sortedPlayers/createSortedPlayers";

export default async function Home() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    try {
      const roomName = (data.get("roomName") as string) ?? "Evento sem nome";
      const priceLimit = data.get("priceLimit") as string;
      const players = [];
      for (const [key, value] of data.entries()) {
        if (typeof value !== "string" || value === "") return;

        if (key.includes("player")) {
          const user = await createUser({
            name: value,
          });
          if (!user) {
            console.error("User not created");
            return;
          }
          players.push(user.id);
        }
      }

      if (players.length === 0) {
        console.error("Empty player list");
      }

      const room = await createRoom({
        roomName: roomName,
        priceLimit: +priceLimit,
        players,
      });

      if (!room) {
        console.log("No room :(");
        console.error("Room not created");
        return;
      }

      const sortedPlayers = sortPlayers(players);

      for (const [gifterId, gifteeId] of sortedPlayers) {
        const sortedPlayers = await createSortedPlayers({
          gifterId,
          gifteeId,
          roomId: room.id,
        });
        if (!sortedPlayers) {
          console.error("Sorted players not created");
        }
      }

      return room.id;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <main>
      <Center>
        <MainForm handleSubmit={handleSubmit} />
      </Center>
    </main>
  );
}
