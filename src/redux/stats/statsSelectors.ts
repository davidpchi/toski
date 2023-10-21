import { createSelector } from "@reduxjs/toolkit";
import { filterMatchesByDate, matchesToCommanderHelper, matchesToPlayersHelper } from "../../logic/dictionaryUtils";
import { Commander } from "../../types/domain/Commander";
import { Match } from "../../types/domain/Match";
import { Player } from "../../types/domain/Player";
import { AppState } from "../rootReducer";

const getMatches = (state: AppState) => state.stats.matches;

const getCommanders = (state: AppState) => state.stats.commanders;

const getPlayers = (state: AppState) => state.stats.players;

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
 * Returns a collection matches in chronological order given a commander NAME. Note that this is not searching using commander id.
 */
const getMatchesByCommanderName = createSelector(
    getMatches,
    (_state: AppState, commanderName: string) => commanderName,
    (_state: AppState, _commanderName: string, startDate?: Date) => startDate,
    (matches: Match[] | undefined, commanderName: string, startDate?: Date): Match[] => {
        if (matches === undefined) {
            return [];
        }

        const allMatches = filterMatchesByDate(matches, startDate);

        const result = [];
        for (const match of allMatches) {
            for (const player of match.players) {
                let foundCommander = false;

                for (const commander of player.commanders) {
                    if (commander === commanderName) {
                        result.push(match);
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

        return result;
    }
);

/**
 * Returns a collection matches in chronological order given a player NAME
 */
const getMatchesByPlayerName = createSelector(
    getMatches,
    (_state: AppState, playerName: string) => playerName,
    (_state: AppState, _playerName: string, startDate?: Date) => startDate,
    (matches: Match[] | undefined, playerName: string, startDate?: Date): Match[] => {
        if (matches === undefined) {
            return [];
        }

        const allMatches = filterMatchesByDate(matches, startDate);

        const result = [];
        for (const match of allMatches) {
            for (const player of match.players) {
                if (player.name === playerName) {
                    result.push(match);
                    break;
                }
            }
        }

        return result;
    }
);

const getCommandersByDate = createSelector(
    getMatches,
    getCommanders,
    (_state: AppState, startDate?: Date) => startDate,
    (
        matches: Match[] | undefined,
        commanders: { [id: string]: Commander } | undefined,
        startDate?: Date
    ): Commander[] => {
        if (matches === undefined || commanders === undefined) {
            return [];
        }

        return Object.values(matchesToCommanderHelper(matches, undefined, startDate));
    }
);

/**
 * Returns a collection commanders in chronological order given a player name
 */
const getCommandersByPlayerName = createSelector(
    getMatches,
    getCommanders,
    (_state: AppState, playerName: string) => playerName,
    (_state: AppState, _playerName: string, startDate?: Date) => startDate,
    (
        matches: Match[] | undefined,
        commanders: { [id: string]: Commander } | undefined,
        playerName: string,
        startDate?: Date
    ): Commander[] => {
        if (matches === undefined || commanders === undefined) {
            return [];
        }

        return Object.values(matchesToCommanderHelper(matches, playerName, startDate));
    }
);

const getFavoriteCommanderForPlayer = createSelector(getCommandersByPlayerName, (commanders: Commander[]) => {
    return commanders !== undefined && commanders.length > 0
        ? commanders.sort((a, b) => b.matches.length - a.matches.length)[0]!
        : undefined;
});

const getPlayersByDate = createSelector(
    getMatches,
    getCommanders,
    (_state: AppState, startDate?: Date) => startDate,
    (matches: Match[] | undefined, commanders: { [id: string]: Commander } | undefined, startDate?: Date): Player[] => {
        if (matches === undefined || commanders === undefined) {
            return [];
        }

        return Object.values(matchesToPlayersHelper(matches, undefined, startDate));
    }
);

/**
 * Returns a collection of players in chronological order based on commander NAME
 */
const getPlayersByCommanderName = createSelector(
    getMatches,
    getCommanders,
    (_state: AppState, commanderName: string) => commanderName,
    (_state: AppState, _commanderName: string, startDate?: Date) => startDate,
    (
        matches: Match[] | undefined,
        commanders: { [id: string]: Commander } | undefined,
        commanderName: string,
        startDate?: Date
    ): Player[] => {
        if (matches === undefined || commanders === undefined) {
            return [];
        }

        return Object.values(matchesToPlayersHelper(matches, commanderName, startDate));
    }
);

export const StatsSelectors = {
    getMatches,
    getCommanders,
    getPlayers,
    getMatch,
    getCommander,
    getPlayer,
    getMatchesByCommanderName,
    getMatchesByPlayerName,
    getCommandersByDate,
    getCommandersByPlayerName,
    getFavoriteCommanderForPlayer,
    getPlayersByDate,
    getPlayersByCommanderName
};
