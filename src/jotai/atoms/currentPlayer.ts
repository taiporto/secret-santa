import { atom } from "jotai";
import { User } from "../../../types";

export const currentPlayerAtom = atom({
  id: 0,
  name: "",
  created_at: "",
  wishlist: [],
} as User);
