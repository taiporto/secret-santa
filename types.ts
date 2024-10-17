import { Tables, TablesInsert } from "./database.types";

export type WishlistItem = {
  id: number;
  name: string;
  link: string;
  price: number;
};

export type Wishlist = WishlistItem[];

export type User = Tables<"users">;
export type UserInsert = TablesInsert<"users">;
export type Room = Tables<"rooms">;
export type RoomInsert = TablesInsert<"rooms">;
