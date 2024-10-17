"use server";

import { WishlistItem } from "../../../../../../../types";
import { removeWishlistItem } from "@/lib/api/users/wishlist/removeItem";

export const handleRemoveWishlistItem = async (itemId: WishlistItem["id"]) => {
  const result = await removeWishlistItem({
    itemId,
  });

  if (!result) {
    console.error("Error removing wishlist item");
  }

  return result;
};
