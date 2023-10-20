export type Commander = {
    id: string;
    name: string;
    colorIdentity: string[];
    /**
     * A collection of match IDs of matches that the commander is played in.
     */
    matches: string[];
    /**
     * Number of games we want to take into account when calculating stats (i.e. 4 player pods).
     */
    validMatchesCount: number;
    /**
     * The number of wins across all this player's VALID matches (i.e. 4 player pods).
     */
    wins: number;
};
