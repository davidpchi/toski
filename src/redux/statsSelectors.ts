import { commanderList } from "../services/commanderList";
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
            if (
                player.commanders[0] === commanderName ||
                player.commanders[1] === commanderName
            ) {
                matches.push(match);
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
 * Returns a collection commanders in chronological order given a player NAME
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
        getPlayedCommanderDictionary(state.stats.matches, playerName),
    );

    return commanders;
};

/**
 * Get players in chronological order based on commander NAME
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
        getCommanderPlayerDictionary(state.stats.matches, commanderName),
    );

    return players;
};

/**
 * Gets a specific commander based on commanderId.
 */
export const getCommander = (state: AppState, id: string) => {
    return state.stats.commanders ? state.stats.commanders[id] : undefined;
};

/**
 * Create a dictionary of commanders played by a specific playerId
 */
function getPlayedCommanderDictionary(
    matches: Match[],
    playerId: string,
): { [id: string]: Commander } {
    const playedCommanderDictionary: { [id: string]: Commander } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            if (player.name === playerId) {
                // there is a chance the commander is actually multiple commanders.
                // the current separator for commanders is " && "
                const currentCommanderNames: string[] = player.commanders;

                // loop through all commanders and update our commanders dictionary
                for (const currentCommanderName of currentCommanderNames) {
                    const commander = commanderList[currentCommanderName];

                    // check to see if the commander name is valid
                    if (commander === undefined) {
                        // log the invalid commander
                        console.log(
                            `Invalid commander found in currentMatch <${currentMatch.id}> : ${currentCommanderName}`,
                        );
                        continue;
                    }

                    // commander name is valid. let's check to see if we already added it to our dictionary
                    const potentialCommanderObj =
                        playedCommanderDictionary[commander.id];
                    if (potentialCommanderObj === undefined) {
                        // the entry doesn't exist, add it to our dictionary
                        playedCommanderDictionary[commander.id] = {
                            id: commander.id,
                            name: currentCommanderName,
                            matches: [currentMatch.id],
                            wins: player.rank === "1" ? 1 : 0,
                        };
                    } else {
                        // since this commander exists, update the currentMatch count
                        playedCommanderDictionary[
                            potentialCommanderObj.id
                        ].matches.push(currentMatch.id);
                        if (player.rank === "1") {
                            playedCommanderDictionary[potentialCommanderObj.id]
                                .wins++;
                        }
                    }
                }
            }
        }
    }
    return playedCommanderDictionary;
}

/**
 * Create a dictionary of players who have played a specific commander (by commander ID)
 * @param matches
 * @param playerId
 * @returns dictionary of players
 */
function getCommanderPlayerDictionary(
    matches: Match[],
    commanderName: string,
): { [id: string]: Player } {
    const playerDictionary: { [id: string]: Player } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            const playerCommanders: string[] = player.commanders;

            // loop through all commanders search for our match
            for (const currentCommanderName of playerCommanders) {
                if (currentCommanderName === commanderName) {
                    // Commander is a match, let's check to see if player is already in our dictionary
                    const potentialPlayerObj: Player | undefined =
                        playerDictionary[player.name];
                    if (potentialPlayerObj === undefined) {
                        // the entry doesn't exist, add it to our dictionary
                        playerDictionary[player.name] = {
                            name: player.name,
                            matches: [currentMatch],
                            wins: player.rank === "1" ? 1 : 0,
                        };
                    } else {
                        // since this commander exists, update the currentMatch count
                        playerDictionary[potentialPlayerObj.name].matches.push(
                            currentMatch,
                        );
                        if (player.rank === "1") {
                            playerDictionary[potentialPlayerObj.name].wins++;
                        }
                    }
                }
            }
        }
    }
    return playerDictionary;
}
