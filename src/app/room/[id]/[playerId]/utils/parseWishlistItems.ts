import { User, WishlistItem } from "../../../../../../types";

const parseUrl = (link: string): string => {
  try {
    return new URL(link).href;
  } catch (e) {
    if ((e as TypeError).message === "Invalid URL") {
      return new URL("https://" + link).href;
    }

    return link;
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
      [valueKey]: valueKey === "link" ? parseUrl(value as string) : value,
    });
  }
  return Array.from(newWishlistItemsMap.values()).map((item) => ({
    ...item,
    user_id: userId,
  }));
};
