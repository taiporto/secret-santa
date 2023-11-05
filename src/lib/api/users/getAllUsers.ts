import { supabase } from "../../supabase-config";

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) {
      console.error("Err: ", error);
      return;
    }

    if (!data || data.length === 0) throw new Error("No data");

    console.log(data);

    const userList = data.map((user) => user);
    return userList;
  } catch (err) {
    console.error(err);
    return [];
  }
};
