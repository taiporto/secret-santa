import { myWishlistAtom } from "@/jotai/atoms/wishlist";
import { useAtomValue, useStore } from "jotai";
import { Wishlist, WishlistItem } from "../../types";
import { handleUpdateWishlist } from "@/app/room/[id]/[playerId]/utils/handleUpdateWishlist";
import { useToast } from "@chakra-ui/react";
import { useHydrateAtoms } from "jotai/utils";

export const useWishlist = (initialWishlist?: Wishlist) => {
  const globalStore = useStore();
  const toast = useToast();
  const wishlist = useAtomValue(myWishlistAtom);

  useHydrateAtoms([[myWishlistAtom, initialWishlist || []]], {
    store: globalStore,
  });

  const setNewWishlistItems = (
    newItems: WishlistItem[],
    callback?: () => void
  ) => {
    globalStore.set(myWishlistAtom, (prev) => [...prev, ...newItems]);
    handleUpdateWishlist(newItems).then((result) => {
      callback?.();
      if (result?.length) {
        toast({
          title: "Itens adicionados à lista de presentes",
          status: "success",
          duration: 2000,
        });
      }
    });
  };

  const getWishlist = () => {
    return globalStore.get(myWishlistAtom);
  };

  return {
    wishlist,
    setNewWishlistItems,
    getWishlist,
  };
};
