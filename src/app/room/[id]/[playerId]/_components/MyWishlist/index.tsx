"use client";

import React from "react";
import {
  Box,
  Button,
  Divider,
  List,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { wishlist } = useWishlist(initialWishlist);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = () => {
    onOpen();
  };

  return (
    <>
      <Box>
        <Skeleton isLoaded={!!wishlist}>
          <List mb="6">
            {wishlist?.map((item: TWishlistItem) => (
              <Box key={item.id}>
                <Box my="4">
                  <WishlistItem wishlistItemData={item} />
                </Box>
                <Divider />
              </Box>
            ))}
          </List>
          <Button
            float={wishlist.length ? "right" : undefined}
            onClick={handleAddItem}
          >
            Adicionar item
          </Button>
        </Skeleton>
      </Box>
      <CreateWishlistItemModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
