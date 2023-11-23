import { supabase } from "../../supabase-config";

export const getAllRooms = async () => {
  try {
    const { data, error } = await supabase.from("rooms").select();
    if (error) {
      console.error("Err: ", error);
      return;
    }

    if (!data || data.length === 0) throw new Error("No data");

    const userList = data.map((user) => user);
    return userList;
  } catch (err) {
    console.error(err);
    return [];
  }
};
