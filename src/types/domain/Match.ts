import { MatchPlayer } from "./MatchPlayer";

export type Match = {
    id: string;
    date: Date;
    players: MatchPlayer[];
    numberOfTurns?: number;
    /**
     * The name of the winner. This value is expected to refer to a user in the players array.
     */
    winner: string;
};
