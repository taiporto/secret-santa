import { WishlistItem } from "../../../../../../../../types";

export const parseWishlistItems = (formData: FormData): WishlistItem[] => {
  const newWishlistItemsMap = new Map();
  for (const [key, value] of formData.entries()) {
    const [itemKey, valueKey] = key.split("-");
    newWishlistItemsMap.set(itemKey, {
      ...newWishlistItemsMap.get(itemKey),
      [valueKey]: value,
    });
  }
  return Array.from(newWishlistItemsMap.values());
};
