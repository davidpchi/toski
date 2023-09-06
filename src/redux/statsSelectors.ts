import { Match } from "../types/domain/Match";
import { AppState } from "./rootReducer";

export const getMatches = (state: AppState) => state.stats.matches;

export const getCommanders = (state: AppState) => state.stats.commanders;

export const getPlayers = (state: AppState) => state.stats.players;

/**
 * Gets a specific match based on matchId. matchId is the index in which it is in the array.
 */
export const getMatch = (state: AppState, matchId: string) => {
    const id = Number(matchId);
    return !Number.isNaN(id) && state.stats.matches !== undefined ? state.stats.matches[id] : undefined;
}

/**
 * Returns a collection matches in chronological order given a commander NAME. Note that this is not searching using commander id.
 */
export const getMatchesByCommanderName = (state: AppState, commanderName: string): Match[] => {
    if (state.stats.matches === undefined) {
        return [];
    }

    const matches = [];
    for (const match of state.stats.matches) {
        for (const player of match.players) {
            if (player.commanders[0] === commanderName || player.commanders[1] === commanderName) {
                matches.push(match);
                break;
            }
        }
    }

    return matches;
}

/**
 * Gets a specific commander based on commanderId.
 */
export const getCommander = (state: AppState, id: string) => {
    return state.stats.commanders ? state.stats.commanders[id] : undefined;
}