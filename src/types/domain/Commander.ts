export type Commander = {
    id: string;
    name: string;
    /**
     * The individual colors that make up this commanders color identity.
     */
    colorIdentity: string[];
    /**
     * The friendly name of the color identity.
     */
    colorIdentityName: string;
    /**
     * A collection of match IDs of matches that the commander is played in.
     */
    matches: string[];
    /**
     * Number of matches we want to take into account when calculating stats.
     * This number is determined after removing all games that don't match the minimum
     * criteria to be considered for stats (for example: having the correct number of players).
     */
    validMatchesCount: number;
    /**
     * Valid matches are those determined by some minimum criteria. For example: having the correct number of players.
     */
    wins: number;
};
