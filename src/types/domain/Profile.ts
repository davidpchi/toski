/**
 * Represents metadata about a user of the site
 */
export type Profile = {
    /**
     * The discord id of the user
     */
    id: string;

    /**
     * The user's favorite commander represented by commander Id
     */
    favoriteCommanderId?: string;
};
