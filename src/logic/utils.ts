import { PLAYER_MINIMUM_GAMES_REQUIRED, PLAYER_MINIMUM_WINS_REQUIRED } from "../components/constants";
import { Match } from "../types/domain/Match";
import { Player } from "../types/domain/Player";

export function getWinRatePercentage(winCount: number, totalCount: number) {
    return totalCount > 0 ? Math.round((winCount / totalCount) * 100) : 0;
}

export function avgWinTurn(player: Player) {
    // Early exit conditions
    // Don't show if player has fewer than 10 matches or 5 wins all time
    if (player.wins < PLAYER_MINIMUM_WINS_REQUIRED || player.matches.length < PLAYER_MINIMUM_GAMES_REQUIRED) {
        return "Insufficient data";
    }

    // Create win turns array
    const winTurns = [];

    // Get win turn for every match win
    for (const match of player.matches) {
        if (player.name === match.winner) {
            // Exclude wins without turns data
            if (Number(match.numberOfTurns) > 1) {
                winTurns.push(Number(match.numberOfTurns));
                console.log(`${match.id}, ${match.numberOfTurns}, ${player.name}, ${match.winner}`);
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
