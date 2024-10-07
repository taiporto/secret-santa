import "server-only";
import { User } from "../../../../../types";
import { supabase } from "@/lib/supabase-config";
import { Json } from "../../../../../database.types";

type CreateOrUpdateWishlistProps = {
  userId: User["id"];
  wishlistItems: Json[];
};

const createWishlist = async (
  wishlistItems: User["wishlist"],
  userId: User["id"]
) => {
  const { data, error } = await supabase
    .from("users")
    .update({ wishlist: wishlistItems })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Error updating wishlist");
    throw new Error(error.message);
  }

  return data[0].wishlist;
};

export const createOrUpdateWishlist = async ({
  userId,
  wishlistItems,
}: CreateOrUpdateWishlistProps) => {
  const { data: prevWishlistData, error: prevWishlistError } = await supabase
    .from("users")
    .select("wishlist")
    .eq("id", userId);

  if (prevWishlistError) {
    console.error(prevWishlistError);
    throw new Error("Error fetching previous wishlist");
  }

  const prevWishlist = prevWishlistData[0].wishlist;

  if (!prevWishlist) {
    return createWishlist(wishlistItems, userId);
  }

  const { data, error } = await supabase
    .from("users")
    .update({
      wishlist: mergeWishlists(prevWishlist, wishlistItems),
    })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Error updating wishlist");
    throw new Error(error.message);
  }

  return data[0].wishlist;
};

const mergeWishlists = (prevWishlist: Json[], newWishlist: Json[]) => {
  const mergedWishlist = [...Array.from(prevWishlist), ...newWishlist];

  return mergedWishlist;
};
