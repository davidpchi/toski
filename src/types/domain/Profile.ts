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

    /**
     * The user's Moxfield profile Id
     */
    moxfieldId?: string;

    /**
     * A collection of a user's favorite decks. Today, it is expected that all of these decks come from moxfield.
     */
    decks: {
        /**
         * The id used to identify the deck in chatterfang.
         */
        id: string;
        /**
         * The moxfield id of the deck that can be used in moxfield to look up information about the deck.
         */
        moxfieldId: string;
    }[];

    /**
     * The user's toski player id. This is typically the user's friendly in-game name.
     */
    toskiId?: string;

    /**
     * A bool representing if the admin views should be shown to the user.
     * All admin relevant data is still gated by the service, so even if the user were able to get
     * access to admin only pages, there wouldn't be anything relevant to show.
     */
    isAdmin: boolean;
};
