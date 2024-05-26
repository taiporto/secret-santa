"use server";

import { createOrUpdateWishlist } from "@/lib/api/users/wishlist/createOrUpdateWishlist";
import { User } from "../../../../../../types";

export const handleSubmitWishlist = async (
  data: FormData,
  userId: User["id"]
) => {
  const wishlistMap = new Map();
  ([...data.entries()] as [string, string][]).map(([field, value]) => {
    const itemKey = field.match(/\d+/);
    const fieldName = field.match(/(?<=\d-item-).+/)?.[0] || field;
    const prevValues = wishlistMap.get(`item-${itemKey}`);
    wishlistMap.set(`item-${itemKey}`, { ...prevValues, [fieldName]: value });
  });

  const wishlistItems = Object.fromEntries(wishlistMap);
  const result = await createOrUpdateWishlist({
    userId,
    wishlistItems,
  });

  if (!result || !result.length) {
    console.error("Error updating wishlist");
  }

  return result;
};
