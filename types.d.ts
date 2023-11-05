import { Database } from "./database.types";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Room = Database["public"]["Tables"]["rooms"]["Row"];
