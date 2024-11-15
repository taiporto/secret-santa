"use client";

import React from "react";
import {
  Box,
  Button,
  Divider,
  List,
  Skeleton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  WishlistItem as TWishlistItem,
  Wishlist,
} from "../../../../../../../types";
import { WishlistItem } from "./components/WishlistItem";
import { CreateWishlistItemModal } from "../CreateWishlistItemModal";
import { useWishlist } from "@/hooks/useWihslist";
import { Wrapper } from "./components/Wrapper";

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
      <VStack w="100%">
        <Wrapper wishlistHasLength={!!wishlist.length}>
          <Skeleton w="90%" isLoaded={!!wishlist}>
            <List>
              {wishlist?.map((item: TWishlistItem) => (
                <Box key={item.id}>
                  <Box my="4">
                    <WishlistItem wishlistItemData={item} />
                  </Box>
                  <Divider />
                </Box>
              ))}
            </List>
          </Skeleton>
        </Wrapper>
        <Button
          mt={4}
          marginX={{ base: "auto", md: 0 }}
          float={wishlist.length ? "right" : undefined}
          onClick={handleAddItem}
        >
          Adicionar item
        </Button>
      </VStack>
      <CreateWishlistItemModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
