import { User } from "../../types";

//TODO: Fix this sorting algorithm

type UserId = User["id"];
type UserIdTuple = [UserId, UserId];

const pickRandomPlayer = (players: UserId[]): UserId => {
  return players[Math.floor(Math.random() * players.length)];
};

export const sortPlayers = (players: UserId[]): Array<[UserId, UserId]> => {
  if (players.length === 2) {
    return [
      [players[0], players[1]],
      [players[1], players[0]],
    ];
  }

  const pickedPlayers = new Map();
  const sortedPlayers = players.map((player) => {
    const playersButItself = players.filter((p) => p !== player);
    const iteratedPlayers = new Set();

    let randomPlayer = pickRandomPlayer(playersButItself);
    iteratedPlayers.add(randomPlayer);

    console.log(pickedPlayers);
    while (
      pickedPlayers.has(randomPlayer) &&
      !iteratedPlayers.has(randomPlayer)
    ) {
      randomPlayer = pickRandomPlayer(playersButItself);
      iteratedPlayers.add(randomPlayer);
    }

    pickedPlayers.set(randomPlayer, player);

    return [randomPlayer, player] as UserIdTuple;
  });

  console.log(sortedPlayers);

  return sortedPlayers;
};
