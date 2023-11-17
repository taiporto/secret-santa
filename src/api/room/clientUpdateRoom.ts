import { Room } from "../../../types";

export const clientUpdateRoom = async (
  roomId: Room["id"],
  newData: Partial<Omit<Room, "id">>
) => {
  const updated = await fetch(`/api/room/${roomId}`, {
    method: "PATCH",
    body: JSON.stringify({
      roomId,
      newData,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.ok)
    .catch((err) => console.error(err));

  return updated;
};
