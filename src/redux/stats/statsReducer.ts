import { createReducer } from "@reduxjs/toolkit";
import { Match } from "../../types/domain/Match";
import { StatsAction } from "./statsActions";
import { Commander } from "../../types/domain/Commander";
import { Player } from "../../types/domain/Player";
import { matchesToCommanderHelper, matchesToPlayersHelper } from "../../logic/dictionaryUtils";

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

    /**
     * The start date for filtering matches (ISO date string)
     */
    startDate: string | undefined;
}>;

const getThreeMonthsAgoISO = (): string => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

const initialState: StatsState = {
    matches: undefined,
    commanders: undefined,
    players: undefined,
    startDate: getThreeMonthsAgoISO()
};

export const statsReducer = createReducer(initialState, (builder) => {
    builder.addCase(StatsAction.HydrateMatchHistoryComplete, (state, action) => {
        const matchesCollection = action.payload;
        state.matches = matchesCollection;
        state.commanders = matchesToCommanderHelper(matchesCollection);
        state.players = matchesToPlayersHelper(matchesCollection);
    });

    builder.addCase(StatsAction.UpdateStartDate, (state, action) => {
        state.startDate = action.payload;
    });
});
