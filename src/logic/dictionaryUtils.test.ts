import { Match } from "../types/domain/Match";
import { filterMatchesByDate } from "./dictionaryUtils";

const matches: Match[] = [
    {
        date: new Date(2022, 1, 1),
        id: "1",
        numberOfTurns: 4,
        players: [
            {
                commanders: ["elesh norn"],
                name: "tom",
                rank: "1",
                turnPosition: "1"
            },
            {
                commanders: ["toski"],
                name: "bob",
                rank: "2",
                turnPosition: "2"
            }
        ],
        winner: "tom"
    },
    {
        date: new Date(2023, 1, 1),
        id: "2",
        numberOfTurns: 4,
        players: [
            {
                commanders: ["elesh norn"],
                name: "tom",
                rank: "1",
                turnPosition: "1"
            },
            {
                commanders: ["toski"],
                name: "bob",
                rank: "2",
                turnPosition: "2"
            }
        ],
        winner: "tom"
    },
    {
        date: new Date(2024, 1, 1),
        id: "3",
        numberOfTurns: 4,
        players: [
            {
                commanders: ["elesh norn"],
                name: "tom",
                rank: "1",
                turnPosition: "1"
            },
            {
                commanders: ["toski"],
                name: "bob",
                rank: "2",
                turnPosition: "2"
            }
        ],
        winner: "tom"
    }
];

describe("filterMatchesByDate", function () {
    it("Correctly filter matches by start date (inclusive)", function () {
        const result = filterMatchesByDate(matches, new Date(2023, 1, 1));
        expect(result).toHaveLength(2);
        expect(result).toEqual([matches[1], matches[2]]);
    });

    it("Correctly filter matches by end date (inclusive)", function () {
        const result = filterMatchesByDate(matches, undefined, new Date(2023, 1, 1));
        expect(result).toHaveLength(2);
        expect(result).toEqual([matches[0], matches[1]]);
    });

    it("Filters out matches if start date is after end date", function () {
        const result = filterMatchesByDate(matches, new Date(2024, 1, 1), new Date(2023, 1, 1));
        expect(result).toHaveLength(0);
    });

    it("Correctly filter matches between start and end date", function () {
        const result = filterMatchesByDate(matches, new Date(2022, 1, 2), new Date(2023, 1, 2));
        expect(result).toHaveLength(1);
        expect(result).toEqual([matches[1]]);
    });

    it("Returns all matches if no start or end date", function () {
        const result = filterMatchesByDate(matches);
        expect(result).toHaveLength(3);
        expect(result).toEqual(matches);
    });

    it("Includes match if start date is the same as match date", function () {
        const result = filterMatchesByDate(matches, new Date(2022, 1, 1));
        expect(result).toContainEqual(matches[0]);
    });

    it("Includes match if end date is the same as match date", function () {
        const result = filterMatchesByDate(matches, undefined, new Date(2024, 1, 1));
        expect(result).toContainEqual(matches[2]);
    });

    it("Returns empty array if no matches", function () {
        const result = filterMatchesByDate([]);
        expect(result).toHaveLength(0);
    });
});
