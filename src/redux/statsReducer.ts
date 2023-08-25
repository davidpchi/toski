import { createReducer } from "@reduxjs/toolkit";
import { Match } from "../types/domain/Match";
import { StatsAction } from "./statsActions";
import { Commander } from "../types/domain/Commander";
import { commanderList } from "../services/commanderList";

/**
 * State containing all game history data
 */
export type StatsState = Readonly<{
    matches: Match[] | undefined;
    commanders: { [id: string]: Commander } | undefined;
}>;

const initialState: StatsState = {
    matches: undefined,
    commanders: undefined,
};

export const statsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(
            StatsAction.HydrateMatchHistoryComplete,
            (state, action) => {
                const matchesCollection = action.payload;
                state.matches = matchesCollection;
                state.commanders = matchesToCommanders(matchesCollection);
            }
        );
});

// given a collection of matches, return all of the commanders in those matches
function matchesToCommanders(matches: Match[]): { [id: string]: Commander } {
    const results: { [id: string]: Commander } = {};
    for (const match of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of match.players) {
            const data = results[player.commander];
            // if the entry doesn't exist, maybe add it to our dictionary
            if (data === undefined) {
                // validate that it is a real commander
                const commanderId = commanderList[player.commander];

                if (commanderId !== undefined) {
                    // commander is valid-- add it
                    results[player.commander] = {
                        id: commanderList[player.commander].id,
                        name: player.commander,
                        matches: [match]
                    };
                } else {
                    // log the invalid commander
                    console.log(`Invalid commander found in match <${match.id}> : ${player.commander}`);
                }
            } else {
                // since this commander exists, update the match count
                data.matches.push(match);
                results[player.commander] = data;
            }
        }
    }

    return results
}
