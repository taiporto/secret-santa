import { myWishlistAtom } from "@/jotai/atoms/wishlist";
import { useStore } from "jotai";
import { Wishlist, WishlistItem } from "../../types";
import { useEffect } from "react";
import { handleSubmitWishlist } from "@/app/room/[id]/[playerId]/utils/handleSubmitWishlist";
import { useToast } from "@chakra-ui/react";
import { useHydrateAtoms } from "jotai/utils";

export const useWishlist = (initialWishlist?: Wishlist) => {
  const globalStore = useStore();
  const toast = useToast();

  useHydrateAtoms([[myWishlistAtom, initialWishlist || []]], {
    store: globalStore,
  });

  useEffect(() => {
    const cleanup = globalStore.sub(myWishlistAtom, () => {
      const newWishlist = globalStore.get(myWishlistAtom);

      handleSubmitWishlist(newWishlist).then((result) => {
        if (result?.length) {
          toast({
            title: "Itens adicionados à lista de presentes",
            status: "success",
            duration: 2000,
          });
        }
      });
    });

    return () => {
      cleanup();
    };
  }, [globalStore, toast]);

  const setWishlist = (newItems: WishlistItem[], callback?: () => void) => {
    globalStore.set(myWishlistAtom, (prev) => [...prev, ...newItems]);
    callback?.();
  };

  const getWishlist = () => {
    return globalStore.get(myWishlistAtom);
  };

  return {
    setWishlist,
    getWishlist,
  };
};
