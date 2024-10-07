"use server";

import { revalidatePath } from "next/cache";
import { createOrUpdateWishlist } from "@/lib/api/users/wishlist/createOrUpdateWishlist";
import { User } from "../../../../../../types";
import { parseWishlistItems } from "./parseWishlistItems";

export const handleSubmitWishlist = async (
  data: FormData,
  userId: User["id"]
) => {
  const wishlistItems = parseWishlistItems(data);
  const result = await createOrUpdateWishlist({
    userId,
    wishlistItems,
  });

  if (!result || !result.length) {
    console.error("Error updating wishlist");
  }

  // revalidatePath("/room/[id]/", "layout");
  // // or with route groups
  // revalidatePath("/(main)/post/[slug]", "layout");

  return result;
};
