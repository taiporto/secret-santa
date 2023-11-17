import { supabase } from "@/lib/supabase-config";
import { Room } from "../../../../types";

type UpdateRoomProps = {
  roomId: Room["id"];
  newData: Partial<Room>;
};

export const updateRoom = async ({ roomId, newData }: UpdateRoomProps) => {
  const { data, error } = await supabase
    .from("rooms")
    .update(newData)
    .eq("id", roomId);

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  return data;
};
