"use client";

import React, { useState } from "react";
import { Box, Button, List, Skeleton, useDisclosure } from "@chakra-ui/react";
import {
  WishlistItem as TWishlistItem,
  Wishlist,
} from "../../../../../../../types";
import { WishlistItem } from "./components/WishlistItem";
import { CreateWishlistItemModal } from "../CreateWishlistItemModal";
import { useWishlist } from "@/hooks/useWihslist";

export const MyWishlist = ({
  initialWishlist,
}: {
  initialWishlist: Wishlist;
}) => {
  const { getWishlist } = useWishlist(initialWishlist);

  const [wishlist] = useState<Wishlist>(getWishlist());

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = () => {
    onOpen();
  };

  return (
    <>
      <Box>
        <Skeleton isLoaded={!!wishlist}>
          <List>
            {wishlist?.map((item: TWishlistItem) => (
              <WishlistItem key={item.id} wishlistItemData={item} />
            ))}
          </List>
          <Button onClick={handleAddItem}>Adicionar item</Button>
        </Skeleton>
      </Box>
      <CreateWishlistItemModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
