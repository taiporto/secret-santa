import "server-only";
import { supabase } from "@/lib/supabase-config";
import { User } from "../../../../types";

export const getUserById = async (id: number) => {
  const { data, error } = await supabase.from("users").select().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as User;
};

export const getUsersById = async (idArray: number[]) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .in("id", idArray);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserByName = async (name: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("name", name);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const initChangeListener = () => {
  const changes = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE", // Listen only to UPDATEs
        schema: "public",
      },
      (payload) => console.log(payload)
    )
    .subscribe();

  return changes;
};
