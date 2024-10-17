import { supabase } from "@/lib/supabase-config";
import { User } from "../../../../../types";

export const getAllItemsByUserId = async (userId: User["id"]) => {
  const { data, error } = await supabase
    .from("wishlist_items")
    .select()
    .eq("user_id", userId);

  if (error) {
    console.error("Error getting wishlist");
    throw new Error(error.message);
  }

  return data;
};
