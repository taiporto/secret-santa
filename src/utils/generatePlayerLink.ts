import { Room, User } from "../../types";

export const generatePlayerLink = (
  playerId: User["id"],
  roomId: Room["id"]
) => {
  return `/room/${roomId}/${playerId}`;
};
