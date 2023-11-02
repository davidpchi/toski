/**
 * Represents a player's Moxfield profile (collection of information about that user's Moxfield account)
 */
export type MoxfieldProfile = {
    userName: string;
    /**
     * URL to player's Moxfield profile image. If undefined, the player does not have a Moxfield profile picture
     */
    imageUrl: string | undefined;
};
