import { supabase } from "@/lib/supabase-config";
import { User } from "../../../../types";

type CreateuserProps = {
  name: User["name"];
};

export const createUser = async ({ name }: CreateuserProps) => {
  const { data, error } = await supabase
    .from("users")
    .insert({ name })
    .select();

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  return data[0];
};
