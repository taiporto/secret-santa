import "server-only";
import { supabase } from "@/lib/supabase-config";
import { User } from "../../../../types";

type CreateuserProps = {
  name: User["name"];
};

export const createUser = async ({ name }: CreateuserProps): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .insert({ name })
    .select();

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  return data[0];
};

export const bulkCreateUsers = async (users: string[]): Promise<number[]> => {
  const { data, error } = await supabase
    .from("users")
    .insert(
      users.map((userName) => ({
        name: userName,
      }))
    )
    .select("id");

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  const userIds = data.map((user) => user.id);

  return userIds;
};
