import { User } from "../../types";

type UserId = User["id"];
type GifteeId = User["id"];
type GifterId = User["id"];
type UserIdTuple = [GifterId, GifteeId];

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

  const availablePlayers = new Set(players);

  return players.map((player) => {
    const allAvailablePlayersButItself = new Set(availablePlayers);
    allAvailablePlayersButItself.delete(player);

    let randomPlayer = pickRandomPlayer([...allAvailablePlayersButItself]);
    allAvailablePlayersButItself.delete(randomPlayer);

    while (randomPlayer === undefined) {
      randomPlayer = pickRandomPlayer([...allAvailablePlayersButItself]);
      allAvailablePlayersButItself.delete(randomPlayer);
    }

    availablePlayers.delete(randomPlayer);

    return [player, randomPlayer] as UserIdTuple;
  });
};
