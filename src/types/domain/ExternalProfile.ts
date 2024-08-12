/**
 * Represents a player's external profile (collection of information about that user's external account). This could be moxfield, archidekt, etc.
 */
export type ExternalProfile = {
    id: string;

    userName: string;
    /**
     * URL to player's external account profile image. If undefined, the player does not have an external account profile picture
     */
    imageUrl: string | undefined;
};
