/**
 * Represents a profile from the chatterfang service
 */
export type ChatterfangProfile = {
    userId: number;
    favoriteCommander: string;
    moxfieldId?: string;
    decks: {
        _id: string;
        deckId: string;
        source: string;
    }[];
};
