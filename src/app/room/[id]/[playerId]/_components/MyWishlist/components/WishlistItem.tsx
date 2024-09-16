import React from "react";
import { WishlistItem as TWishlistItem } from "../../../../../../../../types";

export const WishlistItem = ({
  wishlistItemData,
}: {
  wishlistItemData: TWishlistItem;
}) => {
  return <div>{JSON.stringify(wishlistItemData)}</div>;
};
