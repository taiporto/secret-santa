import { User, WishlistItem } from "../../../../../../types";

const parseUrl = (link: string): string => {
  try {
    const url = new URL(link).href;
    return url;
  } catch (e) {
    try {
      const url = new URL("https://" + link).href;
      return url;
    } catch(e) {
      return link;
    }
  }
};

export const parseWishlistItems = (
  formData: FormData,
  userId: User["id"]
): WishlistItem[] => {
  const newWishlistItemsMap = new Map();
  for (const [key, value] of formData.entries()) {
    const [itemKey, valueKey] = key.split("-");
    newWishlistItemsMap.set(itemKey, {
      ...newWishlistItemsMap.get(itemKey),
      [valueKey]: value,
    });
  }
  return Array.from(newWishlistItemsMap.values()).map((item) => ({
    ...item,
    link: item.link ? parseUrl(item.link) : null,
    user_id: userId,
  }));
};
