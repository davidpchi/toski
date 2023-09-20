import { Match } from "../types/domain/Match";
import { filterMatchesByDate } from "./dictionaryUtils";

const matches: Match[] = [
    {
        date: new Date(2022, 1, 1),
        id: "1",
        numberOfTurns: "4",
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
        id: "1",
        numberOfTurns: "4",
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
        id: "1",
        numberOfTurns: "4",
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

// to run tests, run "npm run test" on the project root
describe('filterMatchesByDate', function () {
    it('Correctly filters matches by start date', function () {
        const result = filterMatchesByDate(matches, new Date(2022, 11, 11));
        expect(result).toHaveLength(2);
        expect(result).toEqual([matches[1], matches[2]]);
    });
});
