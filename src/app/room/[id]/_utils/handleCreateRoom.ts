import { createRoom } from "@/lib/api/rooms/createRoom";
import { bulkCreateSortedPlayers } from "@/lib/api/sortedPlayers/createSortedPlayers";
import { bulkCreateUsers } from "@/lib/api/users/createUser";
import { sortPlayers } from "@/utils/sortPlayers";

export const handleCreateRoom = async (data: FormData) => {
  try {
    const roomName = (data.get("roomName") as string) ?? "Evento sem nome";
    const priceLimit = data.get("priceLimit") as string;

    const userNames = ([...data.entries()] as [string, string][]).flatMap(
      ([key, value]) =>
        key.includes("player") && value !== "" ? [value] : []
    );

    const playerIds = await bulkCreateUsers(userNames);

    if (playerIds.length === 0) {
      throw new Error("Empty player list");
    }

    const room = await createRoom({
      roomName: roomName,
      priceLimit: +priceLimit,
      players: playerIds,
    });

    if (!room) {
      throw new Error("Room not created");
    }

    const sortedPlayers = await bulkCreateSortedPlayers(
      sortPlayers(playerIds),
      room.id
    );

    if (!sortedPlayers) {
      throw new Error("Sorted players not created");
    }

    return room.id;
  } catch (err) {
    console.error(err);
    return;
  }
};