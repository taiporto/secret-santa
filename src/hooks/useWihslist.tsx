import { myWishlistAtom } from "@/jotai/atoms/wishlist";
import { useAtomValue, useStore } from "jotai";
import { Wishlist, WishlistItem } from "../../types";
import { handleUpdateWishlist } from "@/app/room/[id]/[playerId]/utils/wishlist/handleUpdateWishlist";
import { useToast } from "@chakra-ui/react";
import { useHydrateAtoms } from "jotai/utils";
import { handleRemoveWishlistItem } from "@/app/room/[id]/[playerId]/utils/wishlist/handleRemoveWishlistItem";

export const useWishlist = (initialWishlist?: Wishlist) => {
  const globalStore = useStore();
  const toast = useToast();
  const wishlist = useAtomValue(myWishlistAtom);

  useHydrateAtoms([[myWishlistAtom, initialWishlist || []]], {
    store: globalStore,
  });

  const setNewWishlistItems = (
    newItems: WishlistItem[],
    successCallback?: () => void,
    errorCallback?: () => void
  ) => {
    handleUpdateWishlist(newItems).then((result) => {
      if (result?.length) {
        globalStore.set(myWishlistAtom, (prev) => [...prev, ...result]);
        toast({
          title: "Itens adicionados à lista de presentes",
          status: "success",
          duration: 2000,
        });
      }
      successCallback?.();
    }).catch((error) => {
      console.error(error);
      toast({
        title: "Erro ao adicionar itens à lista de presentes",
        status: "error",
        duration: 2000,
      });
      errorCallback?.();
    });
  };

  const removeWishlistItem = (itemId: WishlistItem["id"]) => {
    handleRemoveWishlistItem(itemId).then((result) => {
      if (result) {
        globalStore.set(myWishlistAtom, (prev) =>
          prev.filter((item) => item.id !== itemId)
        );
        toast({
          title: "Item removido da lista de presentes",
          status: "success",
          duration: 2000,
        });
      }
    }).catch((error) => {
      console.error(error);
      toast({
        title: "Erro ao remover item da lista de presentes",
        status: "error",
        duration: 2000,
      });
    });
  };

  const getWishlist = () => {
    return globalStore.get(myWishlistAtom);
  };

  return {
    wishlist,
    getWishlist,
    setNewWishlistItems,
    removeWishlistItem,
  };
};
