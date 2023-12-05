import { createUser } from "@/lib/api/users/createUser";

export const registerBulkUsers = async (users) => {
  const players = [];

  for (const userName of users) {
    const user = await createUser({
      name: userName,
    });
    if (!user) {
      console.error("User not created");
      return;
    }
    players.push(user.id);
  }

  if (players.length === 0) {
    throw new Error("Empty player list");
  }

  return players;
};
