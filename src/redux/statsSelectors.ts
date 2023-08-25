import { AppState } from "./rootReducer";

export const getMatches = (state: AppState) => state.stats.matches;

/**
 * Gets a specific match based on matchId. matchId is the index in which it is in the array.
 */
export const getMatch = (state: AppState, matchId: string) => {
    const id = Number(matchId);
    return !Number.isNaN(id) && state.stats.matches !== undefined ? state.stats.matches[id] : undefined;
}

export const getCommanders = (state: AppState) => state.stats.commanders;