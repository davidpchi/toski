/**
 * Represents metadata about a user of the site
 */
export type Profile = {
    /**
     * The discord id of the user
     */
    id: number;

    /**
     * The user's favorite commander represented by commander Id
     */
    favoriteCommanderId?: string;
};
