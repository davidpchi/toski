import {
    NEW_PLAYER_HIGHLIGHT_DAYS,
    PLAYER_MINIMUM_GAMES_REQUIRED,
    PLAYER_MINIMUM_WINS_REQUIRED
} from "../components/constants";
import { Player } from "../types/domain/Player";

export function getWinRatePercentage(winCount: number, totalCount: number) {
    return totalCount > 0 ? Math.round((winCount / totalCount) * 100) : 0;
}

export function getAverageWinTurn(player: Player) {
    // Early exit conditions
    // Don't show if player has fewer than 10 matches or 5 wins all time
    if (player.matches.length < PLAYER_MINIMUM_GAMES_REQUIRED) {
        return "Not enough games played";
    } else if (player.wins < PLAYER_MINIMUM_WINS_REQUIRED) {
        return "Not enough wins";
    }

    // Create win turns array
    const winTurns = [];

    // Get win turn for every match win
    for (const match of player.matches) {
        if (player.name === match.winner) {
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

export function isNewlyQualifiedPlayer(player: Player) {
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - NEW_PLAYER_HIGHLIGHT_DAYS);
    const lastIndex = player.matches.length - 1;
    if (
        PLAYER_MINIMUM_GAMES_REQUIRED <= player.matches.length &&
        player.matches.length <= 15 &&
        dateOffset < player.matches[lastIndex].date
    ) {
        return true;
    } else {
        return false;
    }
}
