import { Match } from "../domain/Match";
import { MatchPlayer } from "../domain/MatchPlayer";
import { SheetRow } from "./SheetData";

function matchPlayerHelper(
    cell: SheetRow,
    nameIndex: number,
    commanderIndex: number,
    positionIndex: number,
    rankIndex: number): MatchPlayer {

    const nameData = cell.c[nameIndex];
    const commanderData = cell.c[commanderIndex];
    const rankData = cell.c[positionIndex];
    const turnData = cell.c[rankIndex];

    const player: MatchPlayer = {
        name: nameData ? nameData.v.toString() : "",
        commander: commanderData ? commanderData.v.toString() : "",
        rank: rankData ? rankData.v.toString() : "",
        turnPosition: turnData ? turnData.v.toString() : ""
    };

    return player;
}

export function sheetRowToMatch(cell: SheetRow, id: string): Match {
    const date = cell.c[2];

    const player1 = matchPlayerHelper(cell, 3, 4, 5, 6);
    const player2 = matchPlayerHelper(cell, 7, 8, 9, 10);
    const player3 = matchPlayerHelper(cell, 11, 12, 13, 14);
    const player4 = matchPlayerHelper(cell, 15, 16, 17, 18);

    const numberOfTurns = cell.c[19];

    const winnerName = cell.c[22];

    return {
        date: date && date.f ? new Date(date.f) : new Date(),
        id,
        numberOfTurns: numberOfTurns ? numberOfTurns.v.toString() : "",
        players: [player1, player2, player3, player4],
        winner: winnerName ? winnerName.v.toString() : "",
    }
}

export function getPlayerWinRate(matches: Match[], playerName: string): { name: string, winR: number, loseR: number } {
    // Games counter
    let games = 0;

    // Wins counter
    let wins = 0;


    // There exists an array of match objects, each contains an array of match player objects, match player objects have a "name" key
    // We want to loop through all matches / match players looking for playerName and incrementing games / wins

    // Loop through matches
    for (let i = 0; i < matches.length; i++) {
        // Capture matches[i]
        let currentMatch = matches[i];

        // Loop through match players
        for (let j = 0; j < currentMatch.players.length; j++) {
            // If player is in the game, increment game
            if (playerName === currentMatch.players[j].name) {
                games++;

                // If player won the game, increment wins
                if (playerName === currentMatch.winner) {
                    wins++;
                }
            }
        }
    }

    return { name: playerName, winR: (wins / games), loseR: (1 - (wins / games)) }
}