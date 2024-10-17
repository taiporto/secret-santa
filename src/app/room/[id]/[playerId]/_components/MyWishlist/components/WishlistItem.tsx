import React from "react";
import { WishlistItem as TWishlistItem } from "../../../../../../../../types";
import { Flex, Heading, IconButton, Link, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/utils/formatCurrency";
import { DeleteIcon } from "@chakra-ui/icons";
import { useWishlist } from "@/hooks/useWihslist";

export const WishlistItem = ({
  wishlistItemData,
}: {
  wishlistItemData: TWishlistItem;
}) => {
  const { removeWishlistItem } = useWishlist();

  const handleDeleteClick = () => {
    removeWishlistItem(wishlistItemData.id);
  };

  console.log(wishlistItemData);
  return (
    <Flex w="100%" gap={4} align="center">
      <Flex w="100%" justify="space-between" gap={2} align="center">
        {wishlistItemData.link ? (
          <Link href={wishlistItemData.link} isExternal>
            <Heading size="xs" as="h5">
              {wishlistItemData.name}
            </Heading>
          </Link>
        ) : (
          <Heading size="xs" as="h5">
            {wishlistItemData.name}
          </Heading>
        )}
        <Text>
          {wishlistItemData.price
            ? formatCurrency(+wishlistItemData.price)
            : "-"}
        </Text>
      </Flex>
      <IconButton
        aria-label="Remover item"
        colorScheme="red"
        variant="ghost"
        size="sm"
        icon={<DeleteIcon />}
        onClick={handleDeleteClick}
      />
    </Flex>
  );
};
