export type MatchPlayer = {
    /**
     * The unique identifier for the player. Players are expected to be able to hashed via this name.
     */
    name: string;
    /**
     * The commanders that this player is using, as identified by commander NAME
     */
    commanders: string[];
    rank: string;
    turnPosition: string;
};
