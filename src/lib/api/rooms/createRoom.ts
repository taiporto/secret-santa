import { supabase } from "@/lib/supabase-config";
import { Room, User } from "../../../../types";

type CreateRoomProps = {
  roomName: Room["name"];
  priceLimit?: Room["price_limit"];
  players: User["id"][];
};

export const createRoom = async ({
  roomName,
  priceLimit = null,
  players,
}: CreateRoomProps) => {
  const { data, error } = await supabase
    .from("rooms")
    .insert({ name: roomName, price_limit: priceLimit, players })
    .select();

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  return data[0];
};
