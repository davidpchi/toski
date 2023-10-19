export type Commander = {
    id: string;
    name: string;
    colorIdentity: string[];
    /**
     * A collection of match IDs of matches that the commander is played in
     */
    matches: string[];
    validMatches: number; // Games we want to take into account when calculating stats (usually 4 player pod)
    wins: number;
};
