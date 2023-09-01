import { createReducer, current } from "@reduxjs/toolkit";
import { Match } from "../types/domain/Match";
import { StatsAction } from "./statsActions";
import { Commander } from "../types/domain/Commander";
import { commanderList } from "../services/commanderList";
import { Player } from "../types/domain/Player";

/**
 * State containing all game history data
 */
export type StatsState = Readonly<{
    /**
     * An array of all the matches arranged from most recent to earliest.
     */
    matches: Match[] | undefined;

    /**
     * A map of all commanders where the ID is the scryfall commander id.
     */
    commanders: { [id: string]: Commander } | undefined;

    /**
     * A map of all the players where the ID is the user name.
     */
    players: { [id: string]: Player } | undefined;
}>;

const initialState: StatsState = {
    matches: undefined,
    commanders: undefined,
    players: undefined,
};

export const statsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(
            StatsAction.HydrateMatchHistoryComplete,
            (state, action) => {
                const matchesCollection = action.payload;
                state.matches = matchesCollection;
                state.commanders = matchesToCommanders(matchesCollection);
                state.players = matchesToPlayers(matchesCollection);
            }
        );
});

// given a collection of matches, return all of the commanders in those matches
function matchesToCommanders(matches: Match[]): { [id: string]: Commander } {
    const commanderDictionary: { [id: string]: Commander } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            // Variable to call commander name
            const currentCommanderName = player.commander;
            const commander = commanderList[currentCommanderName];

            // check to see if the commander name is valid
            if (commander === undefined) {
                // log the invalid commander
                console.log(`Invalid commander found in currentMatch <$ currentMatch.id}> : ${currentCommanderName}`);
                continue;
            }

            // commander name is valid. let's check to see if we already added it to our dictionary
            const potentialCommanderObj = commanderDictionary[commander.id];
            if (potentialCommanderObj === undefined) {
                // the entry doesn't exist, add it to our dictionary
                commanderDictionary[commander.id] = {
                    id: commander.id,
                    name: currentCommanderName,
                    matches: [currentMatch.id],
                    wins: (player.rank === "1") ? 1 : 0,
                };
            } else {
                // since this commander exists, update the currentMatch count
                commanderDictionary[potentialCommanderObj.id].matches.push(currentMatch.id);
                if (player.rank === "1") {
                    commanderDictionary[potentialCommanderObj.id].wins++;
                }
            }
        }
    }
    return commanderDictionary;
}

// given a collection of matches, return all of the players in those matches
export function matchesToPlayers(matches: Match[]): { [name: string]: Player } {
    const playerDictionary: { [name: string]: Player } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            const currentPlayerName = player.name;
            const potentialPlayerObj = playerDictionary[currentPlayerName];

            // if the entry doesn't exist, add to dictionary
            if (potentialPlayerObj === undefined) {
                playerDictionary[currentPlayerName] = {
                    name: currentPlayerName,
                    matches: [currentMatch],
                    wins: (player.rank === "1") ? 1 : 0,
                }
            } else {
                // since this player exists, update the currentMatch count
                playerDictionary[currentPlayerName].matches.push(currentMatch);
                if (player.rank === "1") {
                    playerDictionary[currentPlayerName].wins++;
                }
            }
        }
    }
    return playerDictionary;
}
