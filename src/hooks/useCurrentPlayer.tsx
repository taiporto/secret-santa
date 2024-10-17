import { useStore } from "jotai";
import { useEffect } from "react";
import { getUserById } from "@/lib/api/users/getUser";
import { currentPlayerAtom } from "@/jotai/atoms/currentPlayer";
import { User } from "../../types";

export const useCurrentPlayer = (userId: User["id"]) => {
  const globalStore = useStore();

  useEffect(() => {
    getUserById(userId).then((user) => {
      globalStore.set(currentPlayerAtom, user);
    });
  }, [globalStore, userId]);

  const getCurrentPlayer = () => {
    return globalStore.get(currentPlayerAtom);
  };

  return {
    getCurrentPlayer,
  };
};
