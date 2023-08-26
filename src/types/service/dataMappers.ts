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
    const rankData = cell.c[rankIndex];
    const turnData = cell.c[positionIndex];

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

    const players: MatchPlayer[] = [];

    // drop all empty players
    if (player1.name !== undefined && player1.name !== "") {
        players.push(player1);
    }

    if (player2.name !== undefined && player2.name !== "") {
        players.push(player2);
    }

    if (player3.name !== undefined && player3.name !== "") {
        players.push(player3);
    }

    if (player4.name !== undefined && player4.name !== "") {
        players.push(player4);
    }

    players.sort((a, b) => Number(a.turnPosition) - Number(b.turnPosition));

    return {
        date: date && date.f ? new Date(date.f) : new Date(),
        id,
        numberOfTurns: numberOfTurns ? numberOfTurns.v.toString() : "",
        players: players,
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