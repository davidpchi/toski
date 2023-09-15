import { matchesToCommanderHelper, matchesToPlayersHelper } from "../logic/dictionaryUtils";
import { Commander } from "../types/domain/Commander";
import { Match } from "../types/domain/Match";
import { Player } from "../types/domain/Player";
import { AppState } from "./rootReducer";

export const getMatches = (state: AppState) => state.stats.matches;

export const getCommanders = (state: AppState) => state.stats.commanders;

export const getPlayers = (state: AppState) => state.stats.players;

/**
 * Gets a specific match based on matchId. matchId is the index in which it is in the array.
 */
export const getMatch = (state: AppState, matchId: string) => {
    const id = Number(matchId);
    return !Number.isNaN(id) && state.stats.matches !== undefined
        ? state.stats.matches[id]
        : undefined;
};

/**
 * Gets a specific commander based on commanderId.
 */
export const getCommander = (state: AppState, id: string) => {
    return state.stats.commanders ? state.stats.commanders[id] : undefined;
};

/**
 * Gets a specific player based on playerId.
 */
export const getPlayer = (state: AppState, id: string) => {
    return state.stats.players ? state.stats.players[id] : undefined;
}

/**
 * Returns a collection matches in chronological order given a commander NAME. Note that this is not searching using commander id.
 */
export const getMatchesByCommanderName = (
    state: AppState,
    commanderName: string,
): Match[] => {
    if (state.stats.matches === undefined) {
        return [];
    }

    const matches = [];
    for (const match of state.stats.matches) {
        for (const player of match.players) {
            let foundCommander = false;

            for (const commander of player.commanders) {
                if (commander === commanderName) {
                    matches.push(match);
                    foundCommander = true;
                    break;
                }
            }

            // since we already determined that this match has the commander, 
            // we don't need to keep looking through the rest of the players of this match
            if (foundCommander) {
                break;
            }
        }
    }

    return matches;
};

/**
 * Returns a collection matches in chronological order given a player NAME
 */
export const getMatchesByPlayerName = (
    state: AppState,
    playerName: string,
): Match[] => {
    if (state.stats.matches === undefined) {
        return [];
    }

    const matches = [];
    for (const match of state.stats.matches) {
        for (const player of match.players) {
            if (player.name === playerName) {
                matches.push(match);
                break;
            }
        }
    }

    return matches;
};

/**
 * Returns a collection commanders in chronological order given a player name
 */
export const getCommandersByPlayerName = (
    state: AppState,
    playerName: string,
): Commander[] => {
    if (
        state.stats.matches === undefined ||
        state.stats.commanders === undefined
    ) {
        return [];
    }

    const commanders = Object.values(
        matchesToCommanderHelper(state.stats.matches, playerName),
    );

    return commanders;
};

/**
 * Returns a collection of players in chronological order based on commander NAME
 * @param state
 * @param playerName
 * @returns
 */
export const getPlayersByCommanderName = (
    state: AppState,
    commanderName: string,
): Player[] => {
    if (
        state.stats.matches === undefined ||
        state.stats.commanders === undefined
    ) {
        return [];
    }

    const players = Object.values(
        matchesToPlayersHelper(state.stats.matches, commanderName),
    );

    return players;
};
