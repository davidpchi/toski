import {
    NEW_PLAYER_HIGHLIGHT_DAYS,
    NUMBER_OF_PLAYERS_FOR_VALID_MATCH,
    PLAYER_MAXIMUM_GAMES_AS_NEW_PLAYER,
    PLAYER_MINIMUM_GAMES_REQUIRED,
    PLAYER_MINIMUM_WINS_REQUIRED
} from "../components/constants";
import { Player } from "../types/domain/Player";


/**
 * Gets the win rate as a percentage (number, without the "%").
 * @param winCount Wins - use wins (valid wins).
 * @param totalCount Number of matches to consider - use valid matches where appropriate.
 * @returns A whole number from 0 to 100.
 */
export function getWinRatePercentage(winCount: number, totalCount: number) {
    return totalCount > 0 ? Math.round((winCount / totalCount) * 100) : 0;
}

/**
 * Gets the average win turn of a player. Filters out automatically matches that don't meet the player count requirement.
 * @param player Has to be type Player.
 * @returns A number rounded up to one decimal.
 */
export function getAverageWinTurn(player: Player) {
    // Early exit conditions
    // Don't show if player has fewer than 10 matches or 5 wins all time
    if (player.validMatchesCount < PLAYER_MINIMUM_GAMES_REQUIRED) {
        return "Not enough games played";
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
 * Given a player returns whether they're considered to be a newcomer on the stats or not. Counts valid matches only.
 * @param player 
 * @returns
 */
export function isNewlyQualifiedPlayer(player: Player) {
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - NEW_PLAYER_HIGHLIGHT_DAYS);
    const lastIndex = player.validMatchesCount - 1;
    if (
        PLAYER_MINIMUM_GAMES_REQUIRED <= player.validMatchesCount &&
        player.validMatchesCount <= PLAYER_MAXIMUM_GAMES_AS_NEW_PLAYER &&
        dateOffset < player.matches[lastIndex].date
    ) {
        return true;
    } else {
        return false;
    }
}
