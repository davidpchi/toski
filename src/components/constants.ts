export const PLAYER_MINIMUM_GAMES_REQUIRED = 10;
export const PLAYER_MINIMUM_WINS_REQUIRED = 5; // Used for average win turn
export const COMMANDER_MINIMUM_GAMES_REQUIRED = 5;
export const NEW_PLAYER_HIGHLIGHT_DAYS = 30; // Used for highlighting newly qualified players for N days
export const NUMBER_OF_PLAYERS_FOR_VALID_MATCH = 4; // Used for filtering out matches without 4 players
export const PLAYER_MAXIMUM_GAMES_AS_NEW_PLAYER = 15; // Used for defining what constitutes a new player; below this they get highlighted

export const MTG_COLORS: { name: string; id: string; rgb: string }[] = [
    { name: "Black", id: "B", rgb: "rgb(166, 159, 157)" },
    { name: "Green", id: "G", rgb: "rgb(196, 211, 202)" },
    { name: "Red", id: "R", rgb: "rgb(235, 159, 130)" },
    { name: "Blue", id: "U", rgb: "rgb(179, 206, 234)" },
    { name: "White", id: "W", rgb: "rgb(248, 231, 185)" },
];

export const rankDictionary: { [key: string]: string } = {
    "1": "1st",
    "2": "2nd",
    "3": "3rd",
    "4": "4th",
};
