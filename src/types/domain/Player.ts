import { Match } from "./Match";

/**
 * Represents a person participating in games
 */
export type Player = {
    name: string;
    /**
     * A collection of Match objects that the player has participated in. This includes all matches regardless of their validity.
     */
    matches: Match[];
    /**
     * Number of matches we want to take into account when calculating stats.
     * This number is determined after removing all games that don't match the minimum
     * criteria to be considered for stats (for example: having the correct number of players).
     */
    validMatchesCount: number;
    /**
     * The number of wins across all this player's VALID matches (i.e. 4 player pods).
     */
    wins: number;
    /**
     * A dictionary representing the colors of the commanders the player has played.
     * The key is the color as a string, and the value is the number of times that color has been played.
     */
    colorProfile: { [color: string]: number };
};
