import { MatchPlayer } from "./MatchPlayer";

export type Match = {
    id: string;
    date: Date;
    players: MatchPlayer[];

    /**
     * The name of the winner. This value is expected to refer to a user in the players array.
     */
    winner: string;

    /**
     * The number of turns the game took.
     * Optional since some games are missing this data.
     */
    numberOfTurns?: number;

    /**
     * The turn number of  when the first player was knocked out of the game.
     * Optional since some games are missing this data.
     */
    firstKnockOutTurn?: number;

    /**
     * The game length measured in minutes.
     * Optional since some games are missing this data.
     */
    timeLength?: number;
};
