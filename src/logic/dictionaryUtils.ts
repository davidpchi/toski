import { commanderList } from "../services/commanderList";
import { Commander } from "../types/domain/Commander";
import { Match } from "../types/domain/Match";
import { Player } from "../types/domain/Player";

/**
 * Given a collection of matches and a player NAME, create a dictionary of commanders played by a player as identified by that specific playerId
 * @param matches The collection of matches to bulid the dictionary from
 * @param playerId The player name to filter commanders by
 * @returns A dictionary of commanders keyed by commanderId
 */
export function getCommandersByPlayerNameHelper(matches: Match[], playerName: string): { [id: string]: Commander } {
    const playedCommanderDictionary: { [id: string]: Commander } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            if (player.name === playerName) {
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
                            color_identity: commander.color_identity,
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
    }
    return playedCommanderDictionary;
}

/**
 * Given a collection of matches and a commander NAME, create a dictionary of players who have played a specific commander
 * @param matches The collection of matches to bulid the dictionary from
 * @param commanderName The commander to filter players by
 * @returns A dictionary of player keyed by playerId
 */
export function getPlayersByCommanderNameHelper(matches: Match[], commanderName: string): { [id: string]: Player } {
    const playerDictionary: { [id: string]: Player } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            const playerCommanders: string[] = player.commanders;

            // loop through all commanders search for our match
            for (const currentCommanderName of playerCommanders) {
                if (currentCommanderName === commanderName) {
                    // Commander is a match, let's check to see if player is already in our dictionary
                    const potentialPlayerObj: Player | undefined = playerDictionary[player.name];
                    if (potentialPlayerObj === undefined) {
                        // the entry doesn't exist, add it to our dictionary
                        playerDictionary[player.name] = {
                            name: player.name,
                            matches: [currentMatch],
                            wins: player.rank === "1" ? 1 : 0,
                        };
                    } else {
                        // since this player exists, update the currentMatch count
                        playerDictionary[potentialPlayerObj.name].matches.push(currentMatch);
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
