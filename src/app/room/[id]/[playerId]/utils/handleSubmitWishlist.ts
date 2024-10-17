"use server";

import { createWishlistItems } from "@/lib/api/users/wishlist/createItem";
import { Wishlist } from "../../../../../../types";

export const handleSubmitWishlist = async (wishlistItems: Wishlist) => {
  const result = await createWishlistItems({
    wishlistItems,
  });

  if (!result || !result.length) {
    console.error("Error updating wishlist");
  }

  return result;
};
