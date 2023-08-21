import { createReducer } from "@reduxjs/toolkit";
import { Match } from "../types/domain/Match";
import { StatsAction } from "./statsActions";

/**
 * State containing all game history data
 */
export type StatsState = Readonly<{
    matches: Match[] | undefined;
}>;

const initialState: StatsState = {
    matches: undefined,
};

export const statsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(
            StatsAction.HydrateMatchHistoryComplete,
            (state, action) => {
                const matchesCollection = action.payload;
                state.matches = matchesCollection;
            }
        );
});