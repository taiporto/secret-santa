import "server-only";
import { WishlistItem } from "../../../../../types";
import { supabase } from "@/lib/supabase-config";

type RemoveWishlistItemProps = {
  itemId: WishlistItem["id"];
};

export const removeWishlistItem = async ({
  itemId,
}: RemoveWishlistItemProps): Promise<WishlistItem> => {
  const { data, error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("id", itemId)
    .select();

  if (error) {
    console.error("Error updating wishlist");
    throw new Error(error.message);
  }

  return data[0];
};
