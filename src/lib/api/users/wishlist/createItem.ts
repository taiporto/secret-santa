import "server-only";
import { User, WishlistItem } from "../../../../../types";
import { supabase } from "@/lib/supabase-config";

type CreateWishlistItemProps = {
  userId: User["id"];
  wishlistItem: WishlistItem;
};

type CreateWishlistItemSProps = {
  wishlistItems: WishlistItem[];
};

export const createWishlistItem = async ({
  userId,
  wishlistItem,
}: CreateWishlistItemProps) => {
  const { data, error } = await supabase
    .from("wishlist_items")
    .insert({ ...wishlistItem, user_id: userId })
    .select();

  if (error) {
    console.error("Error updating wishlist");
    throw new Error(error.message);
  }

  return data[0];
};

export const createWishlistItems = async ({
  wishlistItems,
}: CreateWishlistItemSProps) => {
  const { data, error } = await supabase
    .from("wishlist_items")
    .insert([...wishlistItems])
    .select();

  if (error) {
    console.error("Error updating wishlist");
    throw new Error(error.message);
  }

  return data[0];
};
