export type ArchidektDeckResponse = {
    id: string; // This is the id of the deck (format ######)
    name: string; // This is the friendly name of the deck
    deckFormat: number; // Format "3" is commander
    featured: string; // This is the image uri of the deck
};
