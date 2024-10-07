// import { currentPlayerAtom } from "@/jotai/atoms/currentPlayer";
import { atom } from "jotai";
import { User } from "../../types";
import { useAtom } from "jotai";

const currentPlayerAtom = atom({
  id: 0,
  name: "",
  created_at: "",
  wishlist: [],
} as User);

export const useCurrentPlayer = () => {
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom);

  return {
    currentPlayer,
    setCurrentPlayer,
  };
};
