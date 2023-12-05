import "server-only";
import { supabase } from "@/lib/supabase-config";

export const getUserById = async (id: number) => {
  const { data, error } = await supabase.from("users").select().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
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
