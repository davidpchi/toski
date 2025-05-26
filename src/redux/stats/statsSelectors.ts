import { createSelector } from "@reduxjs/toolkit";
import { filterMatchesByDate, matchesToCommanderHelper, matchesToPlayersHelper } from "../../logic/dictionaryUtils";
import { Commander } from "../../types/domain/Commander";
import { Match } from "../../types/domain/Match";
import { Player } from "../../types/domain/Player";
import { AppState } from "../rootReducer";

const getMatches = (state: AppState) => state.stats.matches;
const getCommanders = (state: AppState) => state.stats.commanders;
const getPlayers = (state: AppState) => state.stats.players;
const getStartDate = (state: AppState) => state.stats.startDate;

/**
 * Gets a specific match based on matchId. matchId is the index in which it is in the array.
 */
const getMatch = createSelector(
    getMatches,
    (_state: AppState, matchId: string) => matchId,
    (matches: Match[] | undefined, matchId: string) => {
        const id = Number(matchId);
        return !Number.isNaN(id) && matches !== undefined ? matches[id] : undefined;
    }
);

/**
 * Gets a specific commander based on commanderId.
 */
const getCommander = createSelector(
    getCommanders,
    (_state: AppState, id: string) => id,
    (commanders: { [id: string]: Commander } | undefined, id: string) => {
        return commanders ? commanders[id] : undefined;
    }
);

/**
 * Gets a specific player based on playerId.
 */
const getPlayer = createSelector(
    getPlayers,
    (_state: AppState, id: string) => id,
    (players: { [id: string]: Player } | undefined, id: string) => {
        return players ? players[id] : undefined;
    }
);

/**
 * Returns a collection of matches for a given commander NAME, filtered by global startDate.
 */
const getMatchesByCommanderName = createSelector(
    getMatches,
    getStartDate,
    (_state: AppState, commanderName: string) => commanderName,
    (matches: Match[] | undefined, startDate: Date | undefined, commanderName: string): Match[] => {
        if (matches === undefined) return [];

        const filteredMatches = filterMatchesByDate(matches, startDate ? new Date(startDate) : undefined);

        return filteredMatches.filter((match) =>
            match.players.some((player) => player.commanders.includes(commanderName))
        );
    }
);

/**
 * Returns a collection of matches for a given player NAME, filtered by global startDate.
 */
const getMatchesByPlayerName = createSelector(
    getMatches,
    getStartDate,
    (_state: AppState, playerName: string) => playerName,
    (matches: Match[] | undefined, startDate: Date | undefined, playerName: string): Match[] => {
        if (matches === undefined) return [];

        const filteredMatches = filterMatchesByDate(matches, startDate ? new Date(startDate) : undefined);

        return filteredMatches.filter((match) => match.players.some((player) => player.name === playerName));
    }
);

/**
 * Returns all matches filtered by global startDate.
 */
const getMatchesByDate = createSelector(getMatches, getStartDate, (matches, startDate): Match[] => {
    if (!matches) return [];

    return filterMatchesByDate(matches, startDate ? new Date(startDate) : undefined);
});

/**
 * Returns all commanders filtered by global startDate.
 */
const getCommandersByDate = createSelector(
    getMatches,
    getCommanders,
    getStartDate,
    (matches, commanders, startDate): Commander[] => {
        if (matches === undefined || commanders === undefined) return [];

        return Object.values(matchesToCommanderHelper(matches, undefined, startDate ? new Date(startDate) : undefined));
    }
);

/**
 * Returns all commanders for a given player name filtered by global startDate.
 */
const getCommandersByPlayerName = createSelector(
    getMatches,
    getCommanders,
    getStartDate,
    (_state: AppState, playerName: string) => playerName,
    (matches, commanders, startDate, playerName): Commander[] => {
        if (matches === undefined || commanders === undefined) return [];

        return Object.values(
            matchesToCommanderHelper(matches, playerName, startDate ? new Date(startDate) : undefined)
        );
    }
);

/**
 * Returns the favorite commander for a player by match count.
 */
const getFavoriteCommanderForPlayer = createSelector(getCommandersByPlayerName, (commanders: Commander[]) => {
    return commanders.length > 0 ? commanders.sort((a, b) => b.matches.length - a.matches.length)[0] : undefined;
});

/**
 * Returns all players filtered by global startDate.
 */
const getPlayersByDate = createSelector(
    getMatches,
    getCommanders,
    getStartDate,
    (matches, commanders, startDate): Player[] => {
        if (matches === undefined || commanders === undefined) return [];

        return Object.values(matchesToPlayersHelper(matches, undefined, startDate ? new Date(startDate) : undefined));
    }
);

/**
 * Returns all players for a given commander NAME filtered by global startDate.
 */
const getPlayersByCommanderName = createSelector(
    getMatches,
    getCommanders,
    getStartDate,
    (_state: AppState, commanderName: string) => commanderName,
    (matches, commanders, startDate, commanderName): Player[] => {
        if (matches === undefined || commanders === undefined) return [];

        return Object.values(
            matchesToPlayersHelper(matches, commanderName, startDate ? new Date(startDate) : undefined)
        );
    }
);

export const StatsSelectors = {
    getMatches,
    getCommanders,
    getPlayers,
    getMatch,
    getCommander,
    getPlayer,
    getStartDate,
    getMatchesByDate,
    getMatchesByCommanderName,
    getMatchesByPlayerName,
    getCommandersByDate,
    getCommandersByPlayerName,
    getFavoriteCommanderForPlayer,
    getPlayersByDate,
    getPlayersByCommanderName
};
