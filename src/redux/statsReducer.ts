import { createReducer } from "@reduxjs/toolkit";
import { Match } from "../types/domain/Match";
import { StatsAction } from "./statsActions";
import { Commander } from "../types/domain/Commander";
import { Player } from "../types/domain/Player";
import { matchesToCommanderHelper, matchesToPlayersHelper } from "../logic/dictionaryUtils";

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
    builder.addCase(StatsAction.HydrateMatchHistoryComplete, (state, action) => {
        const matchesCollection = action.payload;
        state.matches = matchesCollection;
        state.commanders = matchesToCommanders(matchesCollection);
        state.players = matchesToPlayers(matchesCollection);
    });
});

// given a collection of matches, return all of the commanders in those matches
function matchesToCommanders(matches: Match[]): { [id: string]: Commander } {
    return matchesToCommanderHelper(matches);
}

/**
 * Given a collection of matches, return all of the players in those matches as dictionary of players
 * @param matches an array of matches to flip through
 * @returns a dictionary of players where the key is playerId and the value is a player
 */
export function matchesToPlayers(matches: Match[]): { [name: string]: Player } {
    return matchesToPlayersHelper(matches);
}
