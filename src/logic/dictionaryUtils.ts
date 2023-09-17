import { commanderList } from "../services/commanderList";
import { Commander } from "../types/domain/Commander";
import { Match } from "../types/domain/Match";
import { Player } from "../types/domain/Player";

/**
 * Given a collection of matches, create a dictionary of commanders with optional filters
 * @param matches The collection of matches to build the dictionary from
 * @param playerId An optional player name to filter the commanders by (will only return commanders the player has played)
 * @returns A dictionary of commanders keyed by commanderId
 */
export function matchesToCommanderHelper(matches: Match[], playerNameFilter?: string): { [id: string]: Commander } {
    const playedCommanderDictionary: { [id: string]: Commander } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            // apply our filters
            if (playerNameFilter !== undefined && player.name !== playerNameFilter) {
                // we have an active playerName filter-- if the player name is not a match, then we skip it
                continue;
            }

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
                const potentialCommanderObj = playedCommanderDictionary[commander.id];
                if (potentialCommanderObj === undefined) {
                    // the entry doesn't exist, add it to our dictionary
                    playedCommanderDictionary[commander.id] = {
                        id: commander.id,
                        name: currentCommanderName,
                        colorIdentity: commander.color_identity,
                        matches: [currentMatch.id],
                        wins: player.rank === "1" ? 1 : 0,
                    };
                } else {
                    // since this commander exists, update the currentMatch count
                    playedCommanderDictionary[potentialCommanderObj.id].matches.push(currentMatch.id);
                    if (player.rank === "1") {
                        playedCommanderDictionary[potentialCommanderObj.id].wins++;
                    }
                }
            }
        }
    }
    return playedCommanderDictionary;
}

/**
 * Given a collection of matches, create a dictionary of players with optional filters
 * @param matches The collection of matches to build the dictionary from
 * @param commanderName An optional commander name to filter the users by (the user must have played this commander)
 * @returns A dictionary of player keyed by playerId
 */
export function matchesToPlayersHelper(matches: Match[], commanderNameFilter?: string): { [id: string]: Player } {
    const playerDictionary: { [id: string]: Player } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            // if any of the filters have a value, then we assume the player has failed the filter to start
            let passedFilter = commanderNameFilter === undefined;

            // loop through all commanders and apply our filter
            for (const currentCommanderName of player.commanders) {
                if (currentCommanderName === commanderNameFilter) {
                    passedFilter = true;
                    break;
                }
            }

            if (passedFilter) {
                // passed filters so we want to add this player.
                // let's check to see if player is already in our dictionary.
                const potentialPlayerObj: Player | undefined = playerDictionary[player.name];
                if (potentialPlayerObj === undefined) {
                    // initialize the color profile dictionary
                    const colorProfile: { [color: string]: number } = {};
                    // compute the players color profile
                    for (const commanderName of player.commanders) {
                        const colors = commanderList[commanderName].color_identity;
                        for (const color of colors) {
                            // add or increment this in our colorProfile dictionary
                            colorProfile[color] = colorProfile[color] === undefined ? 1 : colorProfile[color] + 1;
                        }
                    }

                    // the entry doesn't exist, add it to our dictionary
                    playerDictionary[player.name] = {
                        name: player.name,
                        matches: [currentMatch],
                        wins: player.rank === "1" ? 1 : 0,
                        colorProfile: colorProfile,
                    };
                } else {
                    // since this player exists, update the currentMatch count
                    playerDictionary[player.name].matches.push(currentMatch);
                    if (player.rank === "1") {
                        playerDictionary[player.name].wins++;
                    }

                    // compute the players color profile
                    for (const commanderName of player.commanders) {
                        const colors = commanderList[commanderName].color_identity;
                        for (const color of colors) {
                            // add or increment this in our colorProfile dictionary
                            playerDictionary[player.name].colorProfile[color] =
                                playerDictionary[player.name].colorProfile[color] === undefined
                                    ? 1
                                    : playerDictionary[player.name].colorProfile[color] + 1;
                        }
                    }
                }
            }
        }
    }
    return playerDictionary;
}
