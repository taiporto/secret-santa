import { supabase } from "@/lib/supabase-config";

export const getRoomById = async (id: number) => {
  try {
    const { data, error } = await supabase.from("rooms").select().eq("id", id);

    if (error) {
      console.error("Err: ", error);
      return;
    }

    return data[0];
  } catch (err) {
    console.error(err);
    return;
  }
};
