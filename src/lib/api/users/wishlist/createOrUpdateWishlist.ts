import "server-only";
import { User, WishlistItem } from "../../../../../types";
import { supabase } from "@/lib/supabase-config";

type AddItemToWishlistProps = {
  userId: User["id"];
  item: WishlistItem;
};

export const addItemToWishlist = async ({ item, userId }: AddItemToWishlistProps) => {
  const { data, error } = await supabase
    .from("wishlist_items")
    .insert({
      ...item,
      user_id: userId,
    })
    .select();

  if (error) {
    console.error("Error updating wishlist");
    throw new Error(error.message);
  }

  return data[0];
};