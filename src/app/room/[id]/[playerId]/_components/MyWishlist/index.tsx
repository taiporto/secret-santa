"use client";

import { Box, Button, List, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  User,
  WishlistItem as TWishlistItem,
} from "../../../../../../../types";
import { CreateWishlistModal } from "../CreateWishlistModal";
import { WishlistItem } from "./components/WishlistItem";

type MyWishlistProps = {
  wishlist: User["wishlist"];
  userId: User["id"];
};

export const MyWishlist = ({ wishlist, userId }: MyWishlistProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = () => {
    onOpen();
  };

  return (
    <>
      <Box>
        <List>
          {wishlist?.map((item: TWishlistItem) => (
            <WishlistItem key={item.id} wishlistItemData={item} />
          ))}
        </List>
        <Button onClick={handleAddItem}>Adicionar item</Button>
      </Box>
      <CreateWishlistModal userId={userId} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
