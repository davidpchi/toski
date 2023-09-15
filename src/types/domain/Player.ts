import { Match } from "./Match";

export type Player = {
    name: string;
    matches: Match[];
    wins: number;
    /**
     * A dictionary representing the colors of the commanders the player has played. 
     * The key is the color as a string, and the value is the number of times that color has been played.
     */
    colorProfile: { [color: string]: number }
}