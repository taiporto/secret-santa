"use client";

import { Box, Button, List, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { User } from "../../../../../../../types";
import { CreateWishlistItemModal } from "../CreateWishlistItemModal";

export const MyWishlist = ({ wishlist }: { wishlist: User["wishlist"] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = () => {
    onOpen();
  };

  return (
    <>
      <Box>
        <Button onClick={handleAddItem}>Adicionar item</Button>
        <List>
          {wishlist?.map((item, index) => (
            <Box key={index}>{JSON.stringify(item)}</Box>
          ))}
        </List>
      </Box>
      <CreateWishlistItemModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
