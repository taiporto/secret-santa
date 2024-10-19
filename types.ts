import { Tables, TablesInsert } from "./database.types";

export type User = Tables<"users">;
export type UserInsert = TablesInsert<"users">;
export type WishlistItem = Tables<"wishlist_items">;
export type WishlistItemInsert = TablesInsert<"wishlist_items">;
export type Room = Tables<"rooms">;
export type RoomInsert = TablesInsert<"rooms">;

export type Wishlist = WishlistItem[];