import "server-only";
import { supabase } from "@/lib/supabase-config";

export const getUserById = async (id: number) => {
  try {
    const { data, error } = await supabase.from("users").select().eq("id", id);

    if (error) {
      console.error("Err: ", error);
      return;
    }

    return data[0];
  } catch (err) {
    console.error(err);
    return;
  }
};

export const getUserByName = async (name: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("name", name);

    if (error) {
      console.error("Err: ", error);
      return;
    }

    return data[0];
  } catch (err) {
    console.error(err);
    return;
  }
};
