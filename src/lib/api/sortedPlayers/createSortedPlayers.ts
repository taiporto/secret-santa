import { supabase } from "@/lib/supabase-config";
import { Room, User } from "../../../../types";

type CreateSortedPlayersProps = {
  gifterId: User["id"];
  gifteeId: User["id"];
  roomId: Room["id"];
};

export const createSortedPlayers = async ({
  gifterId,
  gifteeId,
  roomId,
}: CreateSortedPlayersProps) => {
  try {
    const { data, error } = await supabase
      .from("sorted_users")
      .insert({ gifter_id: gifterId, giftee_id: gifteeId, room_id: roomId })
      .select();

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return data[0];
  } catch (err) {
    console.error(err);
    return;
  }
};
