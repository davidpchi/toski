import {
    COMMANDER_MINIMUM_GAMES_REQUIRED,
    COMMANDER_MINIMUM_WINS_REQUIRED,
    NEW_PLAYER_HIGHLIGHT_DAYS,
    NUMBER_OF_PLAYERS_FOR_VALID_MATCH,
    PLAYER_MAXIMUM_GAMES_AS_NEW_PLAYER,
    PLAYER_MINIMUM_GAMES_REQUIRED,
    PLAYER_MINIMUM_WINS_REQUIRED
} from "../components/constants";
import { Commander } from "../types/domain/Commander";
import { Match } from "../types/domain/Match";
import { Player } from "../types/domain/Player";

/**
 * Gets the win rate as a percentage. When calling this function make sure "winCount" and "totalCount" refer to the same set of matches.
 * @param winCount
 * @param matchesCount
 * @param decimalPlaces The number of decimal places to round to. Default is 0 decimal places. Use -1 to return the full float.
 * @returns Returns the winrate as a percentage from 0 to 100. Returns -1 if there's an error.
 */
export function getWinRatePercentage(
    winCount: number,
    matchesCount: number,
    decimalPlaces: number | undefined = 0
): number {
    if (winCount < 0 || matchesCount <= 0) {
        console.error("getWinRatePercentage winCount was negative or matchesCount was 0 or negative.");
        return -1;
    }
    if (!Number.isInteger(decimalPlaces)) {
        console.error("getWinRatePercentage tried to round by a non-integer.");
        return -1;
    }
    // Technically any negative integer will do, to get the float, but instructions tell you to use -1. This is intended.
    const winrate = (winCount / matchesCount) * 100;
    if (decimalPlaces < 0) {
        return winrate;
    }
    // For lack of a better rounding function we take the full float winrate and multiply that
    // by 10 to the power of the desired number of decimal places.
    // Then we round to the nearest whole number. Then we divide again with the same number we multiplied with.
    // This way we get an actual rounding on the decimal places and something like 35.9 will round to 36 and not 35,
    // which would not happen if you used a .toFixed method.
    // Interestingly, you could pass negative integer decimalPlaces through this to get rounded to the nearest ten (-1) or a hundred (-2) etc.
    // As of now that functionality is NOT implemented but the possibility exists.
    return Math.round(winrate * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

/**
 * Given a player gets the average win turn of a player.
 * Filters out automatically matches that don't meet the player count requirement.
 * @param player
 * @returns A number rounded up to one decimal.
 */
export function getAverageWinTurnForPlayer(player: Player) {
    // Early exit conditions
    // Don't show if player has fewer than 10 matches or 5 wins all time
    if (player.validMatchesCount < PLAYER_MINIMUM_GAMES_REQUIRED) {
        return "Not enough games";
    } else if (player.wins < PLAYER_MINIMUM_WINS_REQUIRED) {
        return "Not enough wins";
    }

    // Create win turns array
    const winTurns = [];

    // Get win turn for every match win
    for (const match of player.matches) {
        // Exclude matches where player isn't a winner and player count requirement isn't filled
        if (player.name === match.winner && match.players.length === NUMBER_OF_PLAYERS_FOR_VALID_MATCH) {
            // Exclude wins without turns data
            if (Number(match.numberOfTurns) > 0) {
                winTurns.push(Number(match.numberOfTurns));
            }
        }
    }

    // Calculate average win turn
    const temp: number = winTurns.reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
    }, 0);
    const average = temp / winTurns.length; // Don't use player.wins, it includes games without recorded turns

    // Return as string rounded to nearest tenth
    return average.toFixed(1);
}

/**
 * Given a commander gets the average win turn of a commander.
 * Filters out automatically matches that don't meet the commander count requirement.
 * @param player
 * @returns A number rounded up to one decimal.
 */
export function getAverageWinTurnForCommander(commander: Commander, matches: Match[]) {
    // Early exit conditions
    // Don't show if player has fewer than 10 matches or 5 wins all time
    if (commander.validMatchesCount < COMMANDER_MINIMUM_GAMES_REQUIRED) {
        return "Not enough games";
    } else if (commander.wins < COMMANDER_MINIMUM_WINS_REQUIRED) {
        return "Not enough wins";
    }

    // Create win turns array
    const winTurns = [];

    // Get win turn for every match win
    for (const matchId of commander.matches) {
        // get the match in question
        const match = matches.find((match) => match.id === matchId);

        if (match !== undefined) {
            // determine if the commander won the game
            const commanders = match.players.filter(
                (player) =>
                    player.name === match.winner &&
                    player.commanders.findIndex((value) => value === commander.name) > -1
            );

            // Exclude matches where commander isn't a winner and commander count requirement isn't filled
            if (commanders.length > 0 && match.players.length === NUMBER_OF_PLAYERS_FOR_VALID_MATCH) {
                // Exclude wins without turns data
                if (Number(match.numberOfTurns) > 0) {
                    winTurns.push(Number(match.numberOfTurns));
                }
            }
        }
    }

    // Calculate average win turn
    const temp: number = winTurns.reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
    }, 0);
    const average = temp / winTurns.length; // Don't use commander.wins, it includes games without recorded turns

    // Return as string rounded to nearest tenth
    return average.toFixed(1);
}

/**
 * Given a player returns whether they're considered to be a newly qualified player. Counts valid matches only.
 * @param player
 * @returns
 */
export function isNewlyQualifiedPlayer(player: Player) {
    const currentDate = new Date();
    const dateOffset = currentDate.getTime() - NEW_PLAYER_HIGHLIGHT_DAYS * 24 * 60 * 60 * 1000;

    // TODO: This logic does not gracefully handle matches that are not valid. We don't really run into this very often
    // though, so we acknowledge this bug and will revisit it when it comes up (invalid matches are not really recorded anymore)
    if (
        PLAYER_MINIMUM_GAMES_REQUIRED <= player.validMatchesCount &&
        player.validMatchesCount <= PLAYER_MAXIMUM_GAMES_AS_NEW_PLAYER &&
        // we should only be looking at the match that qualified the player (aka the PLAYER_MINIMUM_GAMES_REQUIRED match)
        // to determine if we should render the label
        dateOffset < player.matches[PLAYER_MINIMUM_GAMES_REQUIRED - 1].date.getTime()
    ) {
        return true;
    } else {
        return false;
    }
}

/**
 * Given a collection of colors, provides the color identity name.
 */
export function getColorIdentity(v2: string[]) {
    // will return undefined if all else fails
    let identity = undefined;
    if (v2.length === 1) {
        // all of the mono colors
        if (v2.includes("W")) {
            identity = "W";
        } else if (v2.includes("U")) {
            identity = "U";
        } else if (v2.includes("B")) {
            identity = "B";
        } else if (v2.includes("R")) {
            identity = "R";
        } else if (v2.includes("G")) {
            identity = "G";
        } else {
            identity = "Colorless";
        }
    } else if (v2.length === 2) {
        // all gulds
        if (v2.includes("W")) {
            if (v2.includes("U")) {
                identity = "Azorius";
            } else if (v2.includes("B")) {
                identity = "Orzhov";
            } else if (v2.includes("R")) {
                identity = "Boros";
            } else if (v2.includes("G")) {
                identity = "Selesnya";
            }
        } else if (v2.includes("U")) {
            if (v2.includes("B")) {
                identity = "Dimir";
            } else if (v2.includes("R")) {
                identity = "Izzet";
            } else if (v2.includes("G")) {
                identity = "Simic";
            }
        } else if (v2.includes("B")) {
            if (v2.includes("R")) {
                identity = "Rakdos";
            } else if (v2.includes("G")) {
                identity = "Golgari";
            }
        } else if (v2.includes("R")) {
            if (v2.includes("G")) {
                identity = "Gruul";
            }
        } else if (v2.includes("C")) {
            identity = "Colorless";
        }
    } else if (v2.length === 3) {
        // shards and wedges
        if (v2.includes("W")) {
            if (v2.includes("U")) {
                if (v2.includes("B")) {
                    identity = "Esper";
                } else if (v2.includes("R")) {
                    identity = "Jeskai";
                } else if (v2.includes("G")) {
                    identity = "Bant";
                }
            } else if (v2.includes("B")) {
                if (v2.includes("R")) {
                    identity = "Mardu";
                } else if (v2.includes("G")) {
                    identity = "Abzan";
                }
            } else if (v2.includes("R")) {
                if (v2.includes("G")) {
                    identity = "Naya";
                }
            }
        } else if (v2.includes("U")) {
            if (v2.includes("B")) {
                if (v2.includes("R")) {
                    identity = "Grixis";
                } else if (v2.includes("G")) {
                    identity = "Sultai";
                }
            } else if (v2.includes("R")) {
                if (v2.includes("G")) {
                    identity = "Temur";
                }
            }
        } else if (v2.includes("B")) {
            if (v2.includes("R")) {
                if (v2.includes("G")) {
                    identity = "Jund";
                }
            }
        }
    } else if (v2.length === 4) {
        // all of the nephilim
        if (v2.includes("W") === false) {
            identity = "Glint-Eye";
        } else if (v2.includes("U") === false) {
            identity = "Dune-Brood";
        } else if (v2.includes("B") === false) {
            identity = "Ink-Treader";
        } else if (v2.includes("R") === false) {
            identity = "Witch-Maw";
        } else if (v2.includes("G") === false) {
            identity = "Yore-Tiller";
        }
    } else if (v2.length === 5) {
        // if all colors are there, it's five color
        identity = "Five-color";
    }
    return identity;
}
