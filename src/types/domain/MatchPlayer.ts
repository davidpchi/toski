export type MatchPlayer = {
    /**
     * The unique identifier for the player. Players are expected to be able to hashed via this name.
     */
    name: string;
    /**
     * The commander friendly name. TODO: Need to be able to use this as an identifier for commanders down the line
     */
    commander: string;
    rank: string;
    turnPosition: string;
}