import React from "react";
import { WishlistItem as TWishlistItem } from "../../../../../../../../types";
import { Box } from "@chakra-ui/react";

export const WishlistItem = ({
  wishlistItemData,
}: {
  wishlistItemData: TWishlistItem;
}) => {
  return <Box>{JSON.stringify(wishlistItemData)}</Box>;
};
