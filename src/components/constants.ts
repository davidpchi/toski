export const PLAYER_MINIMUM_GAMES_REQUIRED = 10;
export const PLAYER_MINIMUM_WINS_REQUIRED = 5; // Used for average win turn
export const COMMANDER_MINIMUM_GAMES_REQUIRED = 5;

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
