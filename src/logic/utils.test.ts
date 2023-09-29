import { Match } from "../types/domain/Match";
import { Player } from "../types/domain/Player";
import { avgWinTurn, getWinRatePercentage } from "./utils";

describe("getWinRatePercentage", function () {
    it("given win number and total games, provide win rate (as whole number)", function () {
        expect(getWinRatePercentage(5, 10)).toEqual(50);
        expect(getWinRatePercentage(1, 3)).toEqual(33);
        expect(getWinRatePercentage(0, 10)).toEqual(0);
        expect(getWinRatePercentage(10, 10)).toEqual(100);
    });

    it("given no games, handles this case", function () {
        expect(getWinRatePercentage(0, 0)).toEqual(0);
    });
});

describe("avgWinTurn", () => {
    let player: Player;
    let matches: Match[];

    beforeEach(() => {
        // Reset data to test against
        matches = [
            { id: "1", date: new Date(), players: [], numberOfTurns: "7", winner: "John" },
            { id: "2", date: new Date(), players: [], numberOfTurns: "8", winner: "John" },
            { id: "3", date: new Date(), players: [], numberOfTurns: "11", winner: "John" },
            { id: "4", date: new Date(), players: [], numberOfTurns: "0", winner: "John" }, // Invalid: turns
            { id: "5", date: new Date(), players: [], numberOfTurns: "1", winner: "John" }, // Invalid: turns
            { id: "6", date: new Date(), players: [], numberOfTurns: "4", winner: "Sara" }, // Invalid: lost
            { id: "7", date: new Date(), players: [], numberOfTurns: "10", winner: "John" },
            { id: "8", date: new Date(), players: [], numberOfTurns: "3", winner: "Jane" }, // Invalid: lost
            { id: "9", date: new Date(), players: [], numberOfTurns: "9", winner: "Bret" }, // Invalid: lost
            { id: "10", date: new Date(), players: [], numberOfTurns: "9", winner: "John" },
        ];

        player = {
            name: "John",
            matches: matches,
            wins: 7,
            colorProfile: {},
        };
    });

    it("should handle invalid matches and calculate the average win turn correctly", () => {
        expect(avgWinTurn(player)).toBe("9.0"); // (7+8+11+10+9)/5 = 9
    });

    it("should handle rounding average win turn correctly", () => {
        player.matches[0].numberOfTurns = "99.4";
        expect(avgWinTurn(player)).toBe("27.5"); // (99.4+8+11+10+9)/5 = 27.48
    });

    it('should return "Insufficient data" if player has fewer than 10 matches', () => {
        player.matches = [];
        expect(avgWinTurn(player)).toBe("Insufficient data");
    });

    it('should return "Insufficient data" if player has fewer than 5 wins ever', () => {
        player.wins = 4;
        expect(avgWinTurn(player)).toBe("Insufficient data");
    });
});
