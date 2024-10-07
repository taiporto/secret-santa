"use client";

import { Box, Button, List, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  User,
  WishlistItem as TWishlistItem,
} from "../../../../../../../types";
import { WishlistItem } from "./components/WishlistItem";
import { CreateWishlistItemModal } from "../CreateWishlistItemModal";
import { useCurrentPlayer } from "@/hooks/useCurrentPlayer";

type MyWishlistProps = {
  player: User;
};

export const MyWishlist = ({ player }: MyWishlistProps) => {
  const { setCurrentPlayer, currentPlayer } = useCurrentPlayer();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setCurrentPlayer(player);
  }, []);

  const handleAddItem = () => {
    onOpen();
  };

  return (
    <>
      <Box>
        <List>
          {currentPlayer.wishlist?.map((item: TWishlistItem) => (
            <WishlistItem key={item.id} wishlistItemData={item} />
          ))}
        </List>
        <Button onClick={handleAddItem}>Adicionar item</Button>
      </Box>
      <CreateWishlistItemModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
