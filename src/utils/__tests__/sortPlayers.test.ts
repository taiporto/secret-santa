import { sortPlayers } from "../sortPlayers";

const playerIds = [1, 2, 3, 4, 5, 6];

describe("sortPlayers", () => {
  it("should give all gifters a corresponding giftee that's not themselves", () => {
    const sortedPlayers = sortPlayers(playerIds);

    expect(sortedPlayers.length).toBe(playerIds.length);
    for (const tuple of sortedPlayers) {
      expect(tuple[0]).not.toBe(tuple[1]);
      expect(tuple[1]).not.toBeUndefined();
    }
  });

  it("should not repeat giftees between players", () => {
    const sortedPlayers = sortPlayers(playerIds);
    const foundPlayers = [];

    for (const tuple of sortedPlayers) {
      foundPlayers.push(tuple[1]);
    }

    expect(foundPlayers.length).toBe(sortedPlayers.length);
  });
});
