import { NUMBER_OF_PLAYERS_FOR_VALID_MATCH } from "../../../components/constants";
import { Match } from "../../domain/Match";
import { MatchPlayer } from "../../domain/MatchPlayer";
import { SheetRow } from "./SheetData";

function matchPlayerHelper(
    cell: SheetRow,
    nameIndex: number,
    commanderIndex: number,
    positionIndex: number,
    rankIndex: number
): MatchPlayer {
    const nameData = cell.c[nameIndex];
    const commanderData = cell.c[commanderIndex];
    const rankData = cell.c[rankIndex];
    const turnData = cell.c[positionIndex];

    const commanders = commanderData ? commanderData.v.toString().split(" && ") : [];

    const player: MatchPlayer = {
        name: nameData ? nameData.v.toString() : "",
        commanders: commanders,
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

    // Data that is manually entered will have winnerName populated.
    // However, if we swap to form based automated data entry, this field will not
    // exist and we should rely on player rank instead.
    // const winnerName = cell.c[22];
    let winnerName = "";

    const players: MatchPlayer[] = [];

    // drop all empty players
    if (player1.name !== undefined && player1.name !== "") {
        players.push(player1);
        if (player1.rank === "1") {
            winnerName = player1.name;
        }
    }

    if (player2.name !== undefined && player2.name !== "") {
        players.push(player2);
        if (player2.rank === "1") {
            winnerName = player2.name;
        }
    }

    if (player3.name !== undefined && player3.name !== "") {
        players.push(player3);
        if (player3.rank === "1") {
            winnerName = player3.name;
        }
    }

    if (player4.name !== undefined && player4.name !== "") {
        players.push(player4);
        if (player4.rank === "1") {
            winnerName = player4.name;
        }
    }

    players.sort((a, b) => Number(a.turnPosition) - Number(b.turnPosition));

    return {
        date: date && date.f ? new Date(date.f) : new Date(),
        id,
        numberOfTurns: numberOfTurns ? Number(numberOfTurns.v.toString()) : undefined,
        players: players,
        winner: winnerName
    };
}

/**
 * Gets the winrate of a player from a collection of matches without considering invalid matches.
 * @param matches The collection of matches can be a mix of valid and invalid matches.
 * @param playerName
 * @returns Player name, winrate and loserate as whole numbers from 0 to 100.
 */
export function getPlayerWinRate(matches: Match[], playerName: string): { name: string; winR: number; loseR: number } {
    // Valid matches counter
    let validMatches = 0;

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
            // If player is in the game and the game had a valid number of players, increment game
            if (
                playerName === currentMatch.players[j].name &&
                currentMatch.players.length === NUMBER_OF_PLAYERS_FOR_VALID_MATCH
            ) {
                validMatches++;

                // If player won the game, increment wins
                if (playerName === currentMatch.winner) {
                    wins++;
                }
            }
        }
    }

    return { name: playerName, winR: wins / validMatches, loseR: 1 - wins / validMatches };
}
