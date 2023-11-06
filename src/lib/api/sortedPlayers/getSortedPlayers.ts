import { supabase } from "@/lib/supabase-config";

export const getSortedPlayersByGifterId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("sorted_users")
      .select()
      .eq("gifter_id", id);

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
